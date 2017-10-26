-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-10-2017 a las 20:35:38
-- Versión del servidor: 10.1.16-MariaDB
-- Versión de PHP: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectonode`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getPreguntaRespuestas` (IN `IdJuego` INT, IN `nRegistro` INT, IN `correcta` INT, IN `idParticipanteOnline` INT)  BEGIN
	SELECT P.idPregunta,P.pregunta,P.idJuego FROM preguntas P WHERE P.idJuego = IdJuego LIMIT nRegistro,1;
	SELECT @idPregunta := PR.idPregunta FROM preguntas PR WHERE PR.idJuego = IdJuego LIMIT nRegistro,1;
	SELECT R.respuesta,R.correcta FROM respuestas R WHERE R.idPregunta = @idPregunta;
    SELECT COUNT(p.idPregunta) numPreguntas from preguntas p WHERE p.idJuego = IdJuego;
    SELECT r.idRespuesta,r.respuesta,r.correcta as respuestaCorrecta FROM respuestas r WHERE r.correcta = 1 AND r.idPregunta = @idPregunta;
    SELECT @idUltimoParticipante := MAX(idParticipante) FROM participantes;
    INSERT INTO resultados(idParticipante,idPregunta,idJuego,correcta) SELECT /*@idUltimoParticipante*/idParticipanteOnline,@idPregunta,IdJuego,correcta WHERE correcta > -1 AND correcta < 2;    
    SELECT RS.idPregunta,
		   (select count(correcta.correcta) from resultados correcta where correcta.correcta = 1 and correcta.idParticipante = idParticipanteOnline) AS cantCorrectas,
	       (select count(incorrecta.correcta) from resultados incorrecta where incorrecta.correcta = 0 and incorrecta.idParticipante = idParticipanteOnline) AS cantIncorrectas 
	FROM resultados RS WHERE RS.idParticipante = idParticipanteOnline;/*@idUltimoParticipante*/	
    
    SELECT juegoIniciado FROM juegos j WHERE j.idJuego = IdJuego;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetPreguntasRespuestas` (IN `IdJuego` INT)  BEGIN
	/* obtener las preguntas y respuestas en una sola consulta */
    SELECT P.idPregunta,P.pregunta,P.limiteTiempo,P.idJuego,
	       R.idRespuesta,R.respuesta,R.idPregunta,R.correcta 
	FROM preguntas P
	INNER JOIN respuestas R ON P.idPregunta = R.idPregunta
	WHERE P.idJuego = IdJuego;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ingresarParticipante` (IN `Nombre` VARCHAR(100), IN `Carne` VARCHAR(20), IN `IdJuego` INT)  BEGIN
	 DECLARE EXIT HANDLER FOR SQLEXCEPTION
	 BEGIN
	 SHOW ERRORS LIMIT 1;
	 ROLLBACK;
	 END; 
	 
     DECLARE EXIT HANDLER FOR SQLWARNING
	 BEGIN
	 SHOW WARNINGS LIMIT 1;
	 ROLLBACK;
	 END;
		
	START TRANSACTION;    
		SELECT @Juego := (SELECT J.idJuego FROM juegos J WHERE J.idJuego = IdJuego);
        INSERT INTO participantes(nombre,carne,idJuego,idOnline) SELECT Nombre,Carne,@Juego,1 WHERE @Juego > 0;        
		
		/*FILAS AFECTADAS*/
        SELECT ROW_COUNT() AS rc;
        /*TRAER EL ID DEL PARTICIPANTE QUE SE CREO*/
        SELECT max(P.idParticipante) AS idParticipante FROM participantes P;
    COMMIT; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_IniciarJuego` (IN `IdGame` INT)  BEGIN
        UPDATE juegos SET juegoIniciado = 1 WHERE idJuego = IdGame;
        SELECT juegoIniciado FROM juegos WHERE idJuego = IdGame;				
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertarUsuario` (IN `Nombres` VARCHAR(100), IN `Apellidos` VARCHAR(100), IN `Email` VARCHAR(100), IN `Pass` VARCHAR(100))  BEGIN
	 DECLARE EXIT HANDLER FOR SQLEXCEPTION
	 BEGIN
	 SHOW ERRORS LIMIT 1;
	 ROLLBACK;
	 END; 
	 
     DECLARE EXIT HANDLER FOR SQLWARNING
	 BEGIN
	 SHOW WARNINGS LIMIT 1;
	 ROLLBACK;
	 END;
		
	START TRANSACTION;    		
        INSERT INTO usuarios(Nombres,Apellidos,Email,Password) VALUES(Nombres,Apellidos,Email,Pass);
        SELECT MAX(U.idUsuario) AS idUsuarioCreado FROM usuarios U;
				
    COMMIT; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ResultadoDeJuego` (IN `IdJuego` INT)  BEGIN        			
	SELECT R.idParticipante,P.nombre,(select sum(r.correcta) from resultados r where r.idParticipante = P.idParticipante) as sumaCorrectas
	FROM resultados R
	INNER JOIN participantes P ON R.idParticipante = P.idParticipante
	WHERE R.idJuego = IdJuego
	GROUP BY P.nombre
	ORDER BY sumaCorrectas DESC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_TransaccionInsertPreguntasRespuestas` (IN `pregunta` VARCHAR(255), IN `limiteTiempo` VARCHAR(30), IN `IdJuego` INT, IN `resp1` VARCHAR(100), IN `resp2` VARCHAR(100), IN `resp3` VARCHAR(100), IN `resp4` VARCHAR(100), IN `respCorrecta1` BOOLEAN, IN `respCorrecta2` BOOLEAN, IN `respCorrecta3` BOOLEAN, IN `respCorrecta4` BOOLEAN)  BEGIN
	 DECLARE EXIT HANDLER FOR SQLEXCEPTION
	 BEGIN
	 SHOW ERRORS LIMIT 1;
	 ROLLBACK;
	 END; 
	 
     DECLARE EXIT HANDLER FOR SQLWARNING
	 BEGIN
	 SHOW WARNINGS LIMIT 1;
	 ROLLBACK;
	 END;
		
	START TRANSACTION;    
		/* insertar en la tabla pregunta */
		INSERT INTO preguntas(pregunta,limiteTiempo,idJuego) VALUES(pregunta,limiteTiempo,IdJuego);
		SELECT @idPregunta := MAX(idPregunta) FROM preguntas;
		        
		                
		 /*insertar las respuestas en la tabla respuestas */
		
		INSERT INTO respuestas(respuesta,idPregunta,correcta)VALUES(resp1,@idPregunta,respCorrecta1);			
		INSERT INTO respuestas(respuesta,idPregunta,correcta)VALUES(resp2,@idPregunta,respCorrecta2);			
        INSERT INTO respuestas(respuesta,idPregunta,correcta)VALUES(resp3,@idPregunta,respCorrecta3);			
        INSERT INTO respuestas(respuesta,idPregunta,correcta)VALUES(resp4,@idPregunta,respCorrecta4);			
    COMMIT; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_TransaccionPrueba` (IN `nombre` VARCHAR(100), IN `telefono` INT)  BEGIN
	 DECLARE EXIT HANDLER FOR SQLEXCEPTION
	 BEGIN
	 SHOW ERRORS LIMIT 1;
	 ROLLBACK;
	 END; 
	 
     DECLARE EXIT HANDLER FOR SQLWARNING
	 BEGIN
	 SHOW WARNINGS LIMIT 1;
	 ROLLBACK;
	 END;
		
	START TRANSACTION;    
		/* insertar en la tabla prueba */
		INSERT INTO prueba(Nombre,Telefono) VALUES(nombre,telefono);
		
    COMMIT; 
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE `juegos` (
  `idJuego` int(11) NOT NULL,
  `Titulo` varchar(100) NOT NULL,
  `Descripcion` varchar(255) NOT NULL,
  `idUsuarioCrea` int(11) NOT NULL,
  `juegoIniciado` tinyint(4) NOT NULL,
  `fechaCreacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`idJuego`, `Titulo`, `Descripcion`, `idUsuarioCrea`, `juegoIniciado`, `fechaCreacion`) VALUES
(1, 'Node Js', 'Este es un cuestionario acerca de fundamentos basicos de Node JS', 1, 1, '2017-10-24 14:25:41'),
(2, 'HTML 5', 'Preguntas acerca de todas las etiquetas que existen en el nuevo standar HTML 5', 0, 1, '2017-10-24 15:37:51'),
(3, 'Android', 'Conceptos básicos sobre java y android studio', 0, 0, '2017-08-02 06:08:29'),
(4, 'C# Intermedio', 'cuestionario de conceptos que un programador semi-sr debe conocer acerca de C# .Net', 0, 0, '2017-08-04 15:18:18'),
(5, 'Web Services', 'Como consumir web services rest, restfull, y soap', 0, 0, '2017-08-11 07:14:00'),
(6, 'Json', 'JavaScript Object Notation', 0, 0, '2017-08-09 01:12:37'),
(9, 'PHP para Retrasados', 'PHP es un de los lenguajes más usados, pero no significa que sea el mejor', 0, 0, '2017-08-03 13:02:38'),
(10, 'Xamarin', 'Xamarin es una de las tecnologías de microsoft creadas para desarrollar aplicaciones mobiles multiplataforma generando alternativas nativas', 0, 0, '2017-08-03 13:07:16'),
(11, 'Swift IOS ', 'Conceptos acerca del lenguaje de programación de IOS que sustituyo a Objective C++', 0, 0, '2017-08-03 21:38:34'),
(12, 'Laravel  5', 'El framework mas popular del lenguaje php utilizado por millones de programadores.  ', 0, 0, '2017-08-04 08:40:49'),
(17, 'Angular JS 4', 'El framework MVC utilizado en el front-end de muchas aplicaciones.', 0, 0, '2017-08-05 14:54:43'),
(18, 'Xaml', 'Lenguaje para interfaces graficas en xamarin', 0, 0, '2017-08-15 09:56:14'),
(19, 'Parcial 1', 'Definición de componentes básicos de html', 0, 0, '2017-08-19 13:53:57'),
(20, 'Ecuaciones Diferenciales', 'Calculo II', 0, 1, '2017-10-24 15:39:35'),
(21, 'Analisis de sistemas', 'Curso del 8 semestre de ingeniería de sistemas de información y ciencias de la computación', 17, 0, '2017-09-19 22:11:26'),
(22, 'Signal R', 'Signal R es una libreria de .Net para gestionar Sockets entre el navegador y el servidor', 20, 1, '2017-10-24 13:07:09'),
(23, 'MongoDB', 'Base de datos NoSQL', 1, 0, '2017-10-23 16:19:17'),
(24, '.NET CORE', 'Tecnología de microsoft que corre en servidores linux', 20, 1, '2017-10-25 20:07:02'),
(26, 'React JS', 'React JS es una de las librerías modernas de Javascript', 20, 1, '2017-10-24 16:14:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `online`
--

CREATE TABLE `online` (
  `idOnline` int(11) NOT NULL,
  `nombreOnline` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `online`
--

INSERT INTO `online` (`idOnline`, `nombreOnline`) VALUES
(0, 'desconectado'),
(1, 'conectado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participantes`
--

CREATE TABLE `participantes` (
  `idParticipante` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `carne` varchar(20) NOT NULL,
  `idJuego` int(11) NOT NULL,
  `idOnline` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `participantes`
--

INSERT INTO `participantes` (`idParticipante`, `nombre`, `carne`, `idJuego`, `idOnline`) VALUES
(1, 'Participante 1', '1111', 1, 1),
(2, 'Participante 2', '2222', 1, 1),
(3, 'Participante 3', '452435', 1, 1),
(4, 'Particpante 4', '452345', 1, 1),
(5, 'Eduardo', '235', 22, 1),
(6, 'Jorge', '4352', 2, 1),
(7, 'Veinte', '34123', 20, 1),
(8, 'Jazz', '54235', 26, 1),
(9, 'Silvester Stallone', '23452', 26, 1),
(10, 'Arnold', '4245', 26, 1),
(11, 'Charly Custom', '52345', 26, 1),
(12, 'Steve Jobs', '6456345', 26, 1),
(13, 'Jhony Gabriel', '25425', 26, 1),
(14, 'Cambray', '3456345', 26, 1),
(15, 'Wozniak', '2345', 26, 1),
(16, 'Connor Mcgregor', '345645', 26, 1),
(17, 'Carles Puyo', '34656', 26, 1),
(18, 'Berny Allen', '43524', 26, 1),
(19, 'Bill Gates', '23452345', 24, 1),
(20, 'Rony Colleman', '45234', 24, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `idPregunta` int(11) NOT NULL,
  `pregunta` varchar(255) NOT NULL,
  `limiteTiempo` varchar(30) NOT NULL,
  `idJuego` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`idPregunta`, `pregunta`, `limiteTiempo`, `idJuego`) VALUES
(8, 'Que es un WebService', '20 segundos', 5),
(9, ' En que formato puede devolver información un webservice?', '1 minuto', 5),
(10, 'En que lenguaje esta basado Laravel', '20 segundos', 12),
(11, ' Que es angular?', '1 minuto', 17),
(12, ' En que año nació PHP', '20 segundos', 9),
(13, ' pregunta', '40 segundos', 18),
(14, ' otra', '20 segundos', 18),
(15, ' Etiqueta que identifica el encabezado de una pagina ', '20 segundos', 19),
(16, ' Tripa es morral?', '20 segundos', 19),
(17, ' Que es una ecuación diferencial', '20 segundos', 20),
(18, ' otra pregunta', '40 segundos', 20),
(19, ' Pregunta de matematicas', '20 segundos', 20),
(20, ' Para que sirve la etiqueta html p?', '20 segundos', 19),
(21, ' Que es nodeJS', '20 segundos', 1),
(22, ' Node js está basado en?', '40 segundos', 1),
(23, ' Cuantos van a perder Desarrollo Web?', '20 segundos', 19),
(24, ' Que significa HTML?', '40 segundos', 2),
(25, ' HTML es un lenguaje de ?', '40 segundos', 2),
(26, ' Que es el analisis de sistemas', '20 segundos', 21),
(27, ' Signal R es una libreria de?', '20 segundos', 22),
(28, ' Signal R que gestiona?', '40 segundos', 22),
(29, ' Que es React JS', '20 segundos', 26),
(30, ' Es un componente basado en ?', '40 segundos', 26),
(31, ' React es lo mismo que React Native?', '20 segundos', 26),
(32, ' React Js permite el uso de Clases?', '20 segundos', 26),
(33, ' Que es .net core', '20 segundos', 24),
(34, ' Que empresa de tecnología creo .net core', '40 segundos', 24),
(35, ' .net core es la version 6 del framework mvc de microsoft?', '40 segundos', 24),
(36, ' Cual es el comando principal de .net core?', '40 segundos', 24),
(37, 'Que lenguaje de programación debo saber para programar utilizando .net Core?', '1 minuto', 24),
(38, ' Que comando debo utilizar si quiero correr una aplicación con .net core?', '40 segundos', 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prueba`
--

CREATE TABLE `prueba` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Telefono` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `prueba`
--

INSERT INTO `prueba` (`Id`, `Nombre`, `Telefono`) VALUES
(1, 'Eduardo', 54441004),
(2, 'Fernanda', 41793176),
(3, 'mysql', 12345),
(4, 'server', 4433),
(5, 'oracle', 1122),
(6, 'oracle', 1122),
(7, 'psotgres', 1223),
(8, 'Value de la pregunta', 12),
(9, 'Value de la pregunta', 12),
(10, 'Value de la pregunta', 12),
(11, 'Value de la pregunta con transaccion', 12),
(12, 'Value de la pregunta store procedure', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `idRespuesta` int(11) NOT NULL,
  `respuesta` varchar(100) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `correcta` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`idRespuesta`, `respuesta`, `idPregunta`, `correcta`) VALUES
(1, 'Es un servicio que trae información para terceros', 8, 1),
(2, 'Es un sistema operativo', 8, 0),
(3, 'Es un framework', 8, 0),
(4, 'Es una técnica de programación', 8, 0),
(5, 'xaml y sql', 9, 0),
(6, 'html y css', 9, 0),
(7, 'javascript y xml', 9, 0),
(8, 'json y xml', 9, 1),
(9, 'C#', 10, 0),
(10, 'Html', 10, 0),
(11, 'Php', 10, 1),
(12, 'Phython', 10, 0),
(13, 'Framework JavaScript', 11, 1),
(14, 'Libreria Javascript', 11, 0),
(15, 'Orm Javascript', 11, 0),
(16, 'Hosting Javascript', 11, 0),
(17, '1990', 12, 1),
(18, '1890', 12, 0),
(19, '2000', 12, 0),
(20, '2907', 12, 0),
(21, 'primera respuets', 13, 1),
(22, 'segunda', 13, 0),
(23, 'tercer', 13, 0),
(24, 'cuarta', 13, 0),
(25, 'otr', 14, 1),
(26, 'otr', 14, 0),
(27, 'orr', 14, 0),
(28, 'otr', 14, 0),
(29, 'body', 15, 0),
(30, 'head', 15, 1),
(31, 'label', 15, 0),
(32, 'h1', 15, 0),
(33, 'mas o menos', 16, 0),
(34, 'si', 16, 0),
(35, 'no', 16, 0),
(36, 'muy morral', 16, 1),
(37, 'es algo', 17, 1),
(38, 'es la mera toz', 17, 0),
(39, 'no es nada', 17, 0),
(40, 'kakaroto', 17, 0),
(41, 'afd', 18, 1),
(42, 'asdf', 18, 0),
(43, 'asdfsa', 18, 0),
(44, 'asdf', 18, 0),
(45, 'jajaa', 19, 0),
(46, 'jejeje', 19, 0),
(47, 'jijiji', 19, 0),
(48, ' jojojo', 19, 1),
(49, 'Para crear un pie de página', 20, 0),
(50, 'Para crear un parrafo', 20, 1),
(51, 'Para dar estilos', 20, 0),
(52, 'Para hacer animaciones', 20, 0),
(53, 'Framework JavaScript', 21, 1),
(54, 'Orm javascript', 21, 0),
(55, 'mvc', 21, 0),
(56, 'MicroFramework .NET', 21, 0),
(57, 'php', 22, 0),
(58, 'c++', 22, 0),
(59, 'python', 22, 0),
(60, 'javascript', 22, 1),
(61, 'Todos', 23, 1),
(62, 'Ninguno', 23, 0),
(63, 'Solo Tripa y Cash', 23, 0),
(64, 'Pollo, Loro, Porky', 23, 0),
(65, 'Hyper Text Markup Language', 24, 1),
(66, 'Java Script Objectd Notation', 24, 0),
(67, 'Extends Object Model', 24, 0),
(68, 'Php Data Object', 24, 0),
(69, 'Progamación', 25, 0),
(70, 'Marcado y Etiquetado', 25, 1),
(71, 'Estructurado', 25, 0),
(72, 'Procedimental', 25, 0),
(73, 'Una Técnica', 26, 0),
(74, 'Una Metodologia', 26, 1),
(75, 'Una Tarea', 26, 0),
(76, 'Un Procedimiento a Seguir', 26, 0),
(77, '.NET', 27, 1),
(78, 'Php', 27, 0),
(79, 'Python', 27, 0),
(80, 'Javascript', 27, 0),
(81, 'Conexiones', 28, 0),
(82, 'Web-Sockets', 28, 1),
(83, 'Cookies', 28, 0),
(84, 'LocalStorage', 28, 0),
(85, 'Framework', 29, 1),
(86, 'Libreria', 29, 0),
(87, 'Diapositiva', 29, 0),
(88, 'Archivo', 29, 0),
(89, 'html', 30, 0),
(90, 'javascript', 30, 1),
(91, 'css', 30, 0),
(92, 'php', 30, 0),
(93, 'si', 31, 1),
(94, 'no', 31, 0),
(95, 'talves', 31, 0),
(96, 'prefiero no decirlo', 31, 0),
(97, 'no', 32, 0),
(98, ' si', 32, 1),
(99, 'a veces', 32, 0),
(100, 'nunca', 32, 0),
(101, 'Es un ambiente de trabajo open source de microsoft', 33, 1),
(102, 'Es un orm de microsoft', 33, 0),
(103, 'Es una base de datos de microsoft', 33, 0),
(104, 'Es un Microservicio de Micorsoft', 33, 0),
(105, 'Oracle', 34, 0),
(106, 'JetBrains', 34, 0),
(107, 'Google', 34, 0),
(108, 'Microsoft', 34, 1),
(109, 'si', 35, 1),
(110, 'no', 35, 0),
(111, 'talvez', 35, 0),
(112, 'no lo sé', 35, 0),
(113, 'npm', 36, 0),
(114, 'phpartisan', 36, 0),
(115, 'dotnet', 36, 1),
(116, 'start', 36, 0),
(117, 'javascript', 37, 0),
(118, 'php', 37, 0),
(119, 'css', 37, 0),
(120, 'c#', 37, 1),
(121, 'dotnet new', 38, 0),
(122, 'dotnet run', 38, 1),
(123, 'dotnet start', 38, 0),
(124, 'dotnet begin', 38, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

CREATE TABLE `resultados` (
  `idResultado` int(11) NOT NULL,
  `idParticipante` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `idJuego` int(11) NOT NULL,
  `correcta` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `resultados`
--

INSERT INTO `resultados` (`idResultado`, `idParticipante`, `idPregunta`, `idJuego`, `correcta`) VALUES
(1, 1, 22, 0, 0),
(2, 2, 22, 0, 0),
(3, 1, 15, 0, 0),
(4, 2, 15, 0, 0),
(5, 3, 22, 0, 1),
(6, 4, 22, 0, 1),
(7, 3, 15, 0, 1),
(8, 4, 15, 0, 1),
(9, 5, 28, 0, 1),
(10, 5, 15, 0, 1),
(11, 6, 25, 0, 1),
(12, 6, 15, 0, 0),
(13, 7, 18, 0, 1),
(14, 7, 19, 0, 0),
(15, 7, 15, 0, 0),
(16, 6, 20, 0, 0),
(17, 8, 30, 0, 1),
(18, 8, 31, 0, 1),
(19, 8, 32, 0, 1),
(20, 8, 15, 0, 1),
(21, 9, 30, 0, 0),
(22, 9, 31, 0, 1),
(23, 9, 32, 0, 1),
(24, 9, 15, 0, 1),
(25, 10, 30, 26, 1),
(26, 10, 31, 26, 1),
(27, 10, 32, 26, 1),
(28, 10, 15, 26, 1),
(29, 11, 30, 26, 0),
(30, 11, 31, 26, 0),
(31, 11, 32, 26, 1),
(32, 11, 15, 26, 0),
(33, 12, 30, 26, 0),
(34, 12, 31, 26, 1),
(35, 12, 32, 26, 0),
(36, 12, 15, 26, 1),
(37, 13, 30, 26, 1),
(38, 13, 31, 26, 0),
(39, 13, 32, 26, 0),
(40, 13, 15, 26, 0),
(41, 14, 30, 26, 0),
(42, 14, 31, 26, 1),
(43, 14, 32, 26, 0),
(44, 14, 15, 26, 0),
(45, 15, 30, 26, 1),
(46, 15, 31, 26, 1),
(47, 15, 32, 26, 1),
(48, 15, 15, 26, 0),
(49, 16, 30, 26, 1),
(50, 16, 31, 26, 1),
(51, 16, 32, 26, 0),
(52, 16, 15, 26, 0),
(53, 17, 30, 26, 0),
(54, 17, 31, 26, 0),
(55, 17, 32, 26, 0),
(56, 17, 15, 26, 0),
(57, 18, 30, 26, 0),
(58, 18, 31, 26, 0),
(59, 18, 32, 26, 1),
(60, 18, 15, 26, 1),
(61, 19, 34, 24, 1),
(62, 19, 35, 24, 1),
(63, 19, 36, 24, 0),
(64, 19, 37, 24, 1),
(65, 19, 38, 24, 1),
(66, 19, 15, 24, 1),
(67, 20, 34, 24, 0),
(68, 20, 35, 24, 0),
(69, 20, 36, 24, 1),
(70, 20, 37, 24, 1),
(71, 20, 38, 24, 1),
(72, 20, 15, 24, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `Nombres` varchar(100) NOT NULL,
  `Apellidos` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `Nombres`, `Apellidos`, `Email`, `Password`) VALUES
(1, 'Mambo', 'Rosales', 'mambo@gmail.com', '12345'),
(2, 'Jose', 'Morales', 'morales@gmail.com', '00000'),
(3, 'Jorge', 'Lopez', 'jLpez@windowLive.com', '00000'),
(4, 'Jorge', 'Lopez', 'jLpez@windowLive.com', '00000'),
(5, 'Javier', 'Gonzales', 'javi@gmail.com', '999999'),
(6, 'Armando', 'Lopez', 'arm@hotmail.com', '454454'),
(7, 'Armando', 'Lopez', 'arm@hotmail.com', '423542345'),
(8, 'Govany', 'Bonilla', 'gBonilla@gmail.com', 'contrasena'),
(9, 'Esteban', 'Barrios', 'esteban@yahoo.com', 'akjsdlfj'),
(10, 'Govany', 'Bonilla', 'gBonilla@gmail.com', 'jajsdjf'),
(11, 'Govany', 'Bonilla', 'gBonilla@gmail.com', ''),
(12, 'Rufino', 'Barrios', 'r@gmail.com', 'rrrrr'),
(13, 'Rufino', 'Barrios', 'r@gmail.com', 'dfasdf'),
(14, 'Justo', 'Santeliz', 'r@gmail.com', 'adfakjsdfñaskdjf'),
(15, 'Justo', 'Santeliz', 'r@gmail.com', ''),
(16, 'Josep', 'Fonseca', 'jfonseca@gmail..com', '312341'),
(17, 'Jorge', 'Mendizabal', 'jmendizabal@gmail.com', '3523452'),
(18, 'Jorch', 'Washington', 'jwashington@hotmail.com', 'jwashington'),
(19, 'Elver', 'Gonzales', 'elver@gmail.com', '123456'),
(20, 'Eduardo', 'Barrios', 'guayoswing@gmail.com', '123456');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`idJuego`),
  ADD KEY `idUsuarioCrea` (`idUsuarioCrea`);

--
-- Indices de la tabla `online`
--
ALTER TABLE `online`
  ADD PRIMARY KEY (`idOnline`);

--
-- Indices de la tabla `participantes`
--
ALTER TABLE `participantes`
  ADD PRIMARY KEY (`idParticipante`),
  ADD KEY `idOnline` (`idOnline`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`idPregunta`),
  ADD KEY `idJuego` (`idJuego`);

--
-- Indices de la tabla `prueba`
--
ALTER TABLE `prueba`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`idRespuesta`),
  ADD KEY `idPregunta` (`idPregunta`);

--
-- Indices de la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD PRIMARY KEY (`idResultado`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `juegos`
--
ALTER TABLE `juegos`
  MODIFY `idJuego` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT de la tabla `participantes`
--
ALTER TABLE `participantes`
  MODIFY `idParticipante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `idPregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT de la tabla `prueba`
--
ALTER TABLE `prueba`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `idRespuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;
--
-- AUTO_INCREMENT de la tabla `resultados`
--
ALTER TABLE `resultados`
  MODIFY `idResultado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`idJuego`) REFERENCES `juegos` (`idJuego`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `preguntas` (`idPregunta`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
