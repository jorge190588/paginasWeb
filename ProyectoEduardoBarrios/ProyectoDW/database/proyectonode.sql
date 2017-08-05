-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-08-2017 a las 15:48:53
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE `juegos` (
  `idJuego` int(11) NOT NULL,
  `Titulo` varchar(100) NOT NULL,
  `Descripcion` varchar(255) NOT NULL,
  `idPreguntas` int(11) NOT NULL,
  `fechaCreacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`idJuego`, `Titulo`, `Descripcion`, `idPreguntas`, `fechaCreacion`) VALUES
(1, 'Node Js', 'Este es un cuestionario acerca de fundamentos basicos de Node JS', 1, '2017-08-01 04:00:07'),
(2, 'HTML 5', 'Preguntas acerca de todas las etiquetas que existen en el nuevo standar HTML 5', 2, '2017-08-02 12:23:00'),
(3, 'Android', 'Conceptos básicos sobre java y android studio', 3, '2017-08-02 06:08:29'),
(4, 'C# Intermedio', 'cuestionario de conceptos que un programador semi-sr debe conocer acerca de C# .Net', 4, '2017-08-04 15:18:18'),
(5, 'Web Services', 'Como consumir web services rest, restfull, y soap', 3, '2017-08-11 07:14:00'),
(6, 'Json', 'JavaScript Object Notation', 3, '2017-08-09 01:12:37'),
(9, 'PHP para Retrasados', 'PHP es un de los lenguajes más usados, pero no significa que sea el mejor', 10, '2017-08-03 13:02:38'),
(10, 'Xamarin', 'Xamarin es una de las tecnologías de microsoft creadas para desarrollar aplicaciones mobiles multiplataforma generando alternativas nativas', 3, '2017-08-03 13:07:16'),
(11, 'Swift IOS ', 'Conceptos acerca del lenguaje de programación de IOS que sustituyo a Objective C++', 23, '2017-08-03 21:38:34'),
(12, 'Laravel  5', 'El framework mas popular del lenguaje php utilizado por millones de programadores.  ', 3, '2017-08-04 08:40:49'),
(17, 'Angular JS', 'El framework MVC utilizado en el front-end de muchas aplicaciones.', 4, '2017-08-04 11:48:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `idPregunta` int(11) NOT NULL,
  `pregunta` varchar(255) NOT NULL,
  `idJuego` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(2, 'Fernanda', 41793176);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `idRespuesta` int(11) NOT NULL,
  `respuesta` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `correcta` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  MODIFY `idJuego` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `idPregunta` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `prueba`
--
ALTER TABLE `prueba`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `idRespuesta` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`idJuego`) REFERENCES `juegos` (`idJuego`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `preguntas` (`idPregunta`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
