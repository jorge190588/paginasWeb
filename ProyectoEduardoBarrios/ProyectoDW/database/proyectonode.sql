-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-08-2017 a las 20:40:45
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetPreguntasRespuestas` (IN `IdJuego` INT)  BEGIN
	/* obtener las preguntas y respuestas en una sola consulta */
    SELECT P.idPregunta,P.pregunta,P.limiteTiempo,P.idJuego,
	       R.idRespuesta,R.respuesta,R.idPregunta,R.correcta 
	FROM preguntas P
	INNER JOIN respuestas R ON P.idPregunta = R.idPregunta
	WHERE P.idJuego = IdJuego;
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
  `fechaCreacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`idJuego`, `Titulo`, `Descripcion`, `fechaCreacion`) VALUES
(1, 'Node Js', 'Este es un cuestionario acerca de fundamentos basicos de Node JS', '2017-08-01 04:00:07'),
(2, 'HTML 5', 'Preguntas acerca de todas las etiquetas que existen en el nuevo standar HTML 5', '2017-08-02 12:23:00'),
(3, 'Android', 'Conceptos básicos sobre java y android studio', '2017-08-02 06:08:29'),
(4, 'C# Intermedio', 'cuestionario de conceptos que un programador semi-sr debe conocer acerca de C# .Net', '2017-08-04 15:18:18'),
(5, 'Web Services', 'Como consumir web services rest, restfull, y soap', '2017-08-11 07:14:00'),
(6, 'Json', 'JavaScript Object Notation', '2017-08-09 01:12:37'),
(9, 'PHP para Retrasados', 'PHP es un de los lenguajes más usados, pero no significa que sea el mejor', '2017-08-03 13:02:38'),
(10, 'Xamarin', 'Xamarin es una de las tecnologías de microsoft creadas para desarrollar aplicaciones mobiles multiplataforma generando alternativas nativas', '2017-08-03 13:07:16'),
(11, 'Swift IOS ', 'Conceptos acerca del lenguaje de programación de IOS que sustituyo a Objective C++', '2017-08-03 21:38:34'),
(12, 'Laravel  5', 'El framework mas popular del lenguaje php utilizado por millones de programadores.  ', '2017-08-04 08:40:49'),
(17, 'Angular JS 4', 'El framework MVC utilizado en el front-end de muchas aplicaciones.', '2017-08-05 14:54:43'),
(18, 'Xaml', 'Lenguaje para interfaces graficas en xamarin', '2017-08-15 09:56:14');

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
(12, ' En que año nació PHP', '20 segundos', 9);

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
(20, '2907', 12, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`idJuego`);

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `juegos`
--
ALTER TABLE `juegos`
  MODIFY `idJuego` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `idPregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `prueba`
--
ALTER TABLE `prueba`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `idRespuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
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
