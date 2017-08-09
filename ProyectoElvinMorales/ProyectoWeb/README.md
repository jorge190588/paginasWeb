# Ranking de Videos
Un sistema de votación de videos el cual clasifica los videos subidos por los usuarios registrados.

## Instalar Dependencias
```
npm install
```

## Iniciar
```
npm start
```

## Tecnologías Usadas
* [Express](http://expressjs.com/)
* [NodeJS](https://nodejs.org/api/)
* [MySQL](https://www.npmjs.com/package/mysql)
* [Bootstrap 3](http://getbootstrap.com/)
* [Pug](https://www.npmjs.com/package/pug)
* ...

## Herramientas Utilizadas
* [Visual Studio Code](https://code.visualstudio.com/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

# GHERKIN

# Fases

```
1. Feature: Ingreso a la pagina de inicio
* Given: un usuario ingresa a la pagina de inicio
* When: carga la pagina
    And: si esta logueado 
* Then: carga la pagina de inicio
    And: muestra un listado con los videos subidos que incluye titulo, descripcion, video
    And: caracteristicas de visitas, votos, comentarios
```

```
2. Feature: Ingreso a la pagina de inicio
* Given: un usuario ingresa a la pagina de inicio
* When: carga la pagina
    And: si no esta logueado 
* Then: carga la pagina de login
    And: debe mostrar un formulario con titulo "Inicio de Sesion"
    And: debe mostrar un campo para el correo
    And: debe mostrar un campo para la contraseña
    And: debe mostrar un boton con la etiqueta "Entrar"
    And: debe mostrar un boton con la etiqueta "Registrarse" para tener acceso
```

```
3. Feature: Dar click en el boton "Entrar"
* Given: un usuario ingresa a la pagina de login
* When: hace click en el boton de "Entrar"
* Then: carga la pagina de inicio
    And: muestra un listado con los videos subidos que incluye titulo, descripcion, video
    And: caracteristicas de visitas, votos, comentarios
```

```
4. Feature: Ingreso a la pagina de inicio
* Given: un usuario ingresa a la pagina de inicio
* When: carga la pagina
* Then: debe mostrar un boton con etiqueta "Subir video"
    And: debe estar ubicado en lado derecho
    And: debe ser color verde
    And: debe tener un icono de fecha hacia arriba
```

```
5. Feature: Dar click en el boton "Subir video"
* Given: un usuario entra a la pagina de inicio
* When: hace click en el boton de "Subir video"
* Then: debe mostrar un formulario con titulo "Agregar nuevo video"
    And: debe mostrar un campo para agregar el titulo
    And: debe mostrar un campo para agregar la descripcion
    And: debe mostrar un campo para el video
    And: debe mostrar un boton con la etiqueta "Guardar"
```

```
6. Feature: Dar click en el boton "Guardar"
* Given: un usuario entra a la pagina de Agregar nuevo video
* When: hace click en el boton de "Guardar"
    And: llena los campos requeridos
    And: guarda el video
* Then: el video subido debe mostrarse en la pagina de inicio
```