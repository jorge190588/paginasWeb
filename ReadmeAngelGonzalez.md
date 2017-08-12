# Readme.md
# Guerkin Angel Gonzalez

feature: Carga la pagina de inicio
Scenario: Cargar el menu principal
Given: Un usuario entra a la pagina de inicio
When: Carga la pagina
Then: Debe mostrar un pagina con la descripcion del juego y botones como registro de usuario, crear juego y jugar juego


feature: Al presionar la opcion de Registro de usuario
Scenario: Cargar la pagina de registro
Given: Un usuario entra a la pagina de Registro
When: Carga la pagina
Then: y el usuario puede ver un formulario de registro pero este formulario no sera funcional


feature: Al presionar el boton de crear juego
Scenario: Cargar la pagina de crear juego
Given: Un usuario entra a la pagina de Crear juego 
When: Carga la pagina
Then: el usuario puede crear un parrafo, una pregunta y dos respuestas, esto se guardara en una base de datos.


feature: Al presionar el boton de Jugar
Scenario: Cargar la pagina de jugar
Given: Un usuario entra a la pagina de Jugar 
When: Carga la pagina
Then: el usuario podra visualizar los juegos creados y podra acceder a los mismos, mas podra jugarlos porque esa funcionalidad aun no estara disponible para esta version
