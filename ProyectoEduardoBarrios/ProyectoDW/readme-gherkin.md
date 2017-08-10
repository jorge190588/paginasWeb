# Cronograma

## Release 1. 

* Crear juegos preguntas y respuestas.
* Fecha:


# Fases

## Release 1

1. Feature: Ingreso a la pagina de inicio.
* Given: un usuario entra a la pagina de inicio
* When: carga la pagina
* Then: debe mostrar un listado de juegos que incluye nombre, descripcion, total preguntar.


2. Feature: Ingreso a la pagina de inicio.
* Given: un usuario entra a la pagina de inicio
* When: carga la pagina
* Then: debe mostrar un boton (floating action button )para crear un juego el boton no tiene texto solo un icono de "+" 
		que significa agregar o crear
	And: debe estar ubicado en el lado derecho inferior
	And: debe ser de color azul o celeste
	And: debe tener un z-index para que el boton siemrpre este ahí aunque el usuario se desplaze por la pagina

3. Feature: Dar click al boton de crear
* Given: un usuario entra a la pagina de inicio de juegos
* When: hace click en el boton crear juego
* Then: debe mostrar un formulario con titulo "Nuevo juego" 
	And: debe mostrar un campo para escribir el titulo
	And: debe mostrar un campo para escribir la descripcion
	And: debe mostrar un boton para guardar el juego



4. Feature: Dar click al boton de crear juego dentro del formulario para crear
* Given: un usuario entra al formulario
* When: hace click en el boton crear juego
	And: llena los campos
	And: guarda un juego en la base de datos mysql
* Then: el juego guardado debe mostrarse en la pagina de inicio con un order by DESC para que hasta arriba aparezca
		el último juego creado.


5.Feature: Mostrar un listado de juegos que están almacenados en la base de datos
* Given: un usuario entra al index de juegos
* When: no hace nada
* Then: se debe visualizar el listado de juegos creados y almacenados

6. Feature: Crear preguntas asociadas a un juego
* Given: un usuario entrar al listado de juegos
* When: hace click en el boton agregar preguntas a un juego cualquiera de la lista	
* Then: And: debe mostrarse un boton para agregar una pregunta
	And: el boton para agregar pregunta es un vinculo hacia un formualrio
	And: debe mostrarse un formulario para crear una pregunta
	And: debe mostrarse un campo para escribir la pregunta
	And: deben mostrase 4 campos para escribir las 4 opciones de respuesta
	And: debe mostrase un radioButton a la par de cada campo de respuesta para seleccionar cual es la correcta
	And: debe mostrarse un boton para guardar la pregunta en la base de datos