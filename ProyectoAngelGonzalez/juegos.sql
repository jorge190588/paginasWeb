-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 09-09-2017 a las 19:32:00
-- Versión del servidor: 5.5.24-log
-- Versión de PHP: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `juegos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE IF NOT EXISTS `juegos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`id`, `nombre`, `tipo`) VALUES
(3, 'La navidad', 'Cultura general'),
(4, 'Partes de la Computadora', 'Tecnología'),
(8, 'Juanito', 'Pendejo'),
(9, 'Potito', 'Mieloso'),
(10, 'Pedrito', 'chilaquiles'),
(11, 'Caperucita Roja', 'Cuentos'),
(12, 'Examen parcial 1', 'Tecnología');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parrafos`
--

CREATE TABLE IF NOT EXISTS `parrafos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parrafo` varchar(5000) NOT NULL,
  `pregunta` varchar(1000) NOT NULL,
  `respuesta1` varchar(100) NOT NULL,
  `respuesta2` varchar(100) NOT NULL,
  `idjuego` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idjuego` (`idjuego`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `parrafos`
--

INSERT INTO `parrafos` (`id`, `parrafo`, `pregunta`, `respuesta1`, `respuesta2`, `idjuego`) VALUES
(1, 'Caperucita roja era una niña traviesa', '¿Como era caperucita roja?', 'Tranquila', 'Traviesa', 11),
(2, 'Es un framework para trabajar javascrip en el backend', '¿que es javascrip?', 'Framework ', 'Una sopa', 12),
(3, 'jade es un preprocesador de html que funciona del lado de backend', 'Que es jade?', 'una chica', 'un preprocesador', 12);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `parrafos`
--
ALTER TABLE `parrafos`
  ADD CONSTRAINT `parrafos_ibfk_1` FOREIGN KEY (`idjuego`) REFERENCES `juegos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
