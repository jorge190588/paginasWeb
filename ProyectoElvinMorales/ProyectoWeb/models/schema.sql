DROP DATABASE IF EXISTS ranking_videos;

CREATE DATABASE IF NOT EXISTS ranking_videos;

USE ranking_videos;

CREATE TABLE auth(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(150) NOT NULL,
    fecha_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100)
);

CREATE TABLE videos(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    url VARCHAR(150) NOT NULL,
    fecha_publicacion timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    visitas INT NOT NULL DEFAULT 0,
    id_auth INT NOT NULL,
    id_categoria INT NOT NULL
);

CREATE TABLE comments(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    mensaje TEXT NOT NULL,
    fecha timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_auth INT NOT NULL,
    id_video INT NOT NULL
);

CREATE TABLE rating(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    votos INT NOT NULL,
    id_auth INT NOT NULL,
    id_video INT NOT NULL
);