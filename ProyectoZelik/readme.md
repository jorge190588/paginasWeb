

# Cronograma

## Release 1. 

* Crear un juego y jugar con 1 jugador.
* Fecha:


# Fases

## Release 1

1. Feature: Ingreso a la pagina de inicio.
* Given: un usuario entra a la pagina de inicio
* When: carga la pagina
* Then: debe mostrar un listado de juegos que incluye nombre, y la descripcion
   And: debe mostar un boton de color azul con el texto "Crear Preguntas"
   And: debe mostrar un boton de color naranja con el texto "Editar"
   And: debe mostrar un boton de color rojo con el texto "Eliminar"


2. Feature: Ingreso a la pagina de inicio.
* Given: un usuario entra a la pagina de inicio
* When: carga la pagina
* Then: debe mostrar un boton para crear un juego con la etique "crear juego"
	And: debe estar ubicado en el lado derecho superior
	And: debe ser de color verde
	And: debe tener un texto "Nuevo juego"

3. Feature: Dar click al boton de crear juego
* Given: un usuario entra a la pagina de inicio
* When: hace click en el boton crear juego
* Then: debe mostrar un formulario con titulo "Nuevo juego" 
	And: debe mostrar un campo para escribir el titulo
	And: debe mostrar un campo para escribir la descripcion
	And: debe mostrar un campo para escribir la cantidad de preguntas
	And: debe mostrar un boton para guardar el juego
	And: debe mostar un boton para cancelar la creacion del juego



4. Feature: Dar click al boton de crear juego
* Given: un usuario entra a la pagina de inicio
* When: hace click en el boton crear juego
	And: llena los campos
	And: guarda un juego
* Then: el juego guardado debe mostrarse en la pagina de inicio.




