# PREGUNTAS GHERKIN

1. Como se llama el lenguaje que define la estructura y sintaxis básica para la descripción de pruebas que pueden ser entendidas tanto por clientes como por técnicos.
	* Gherkin (ok)
	* Cucumber(x)
	* Java (x)
	* Escenarios (x)

     
2. Cuál es la función de Gherkin? 
R// Generar pruebas para documentación viva que describe perfectamente como se comporta el sistema enriquecido y manteniendo la documentación.

*3.	El formato de Guerkin fue introducido por la herramienta?
R// Cudumber

*4.	Para que nos sirve la pirámide de pruebas automatizadas?
R// Tambien conocida como la pirámide de tests.
En la parte inferior de la pirámide se ubican los test unitarios los cuales representan la parte más extensa de la pirámide de automatización. Los test unitarios brindan feedback muy específico y rápido.
En el otro extremo de la pirámide se encuentran los test de usuario que testean la aplicación punta-a-punta a través de la interface de usuario. Generalmente querremos tener pocos de estos test debido a su fragilidad y alto costo de mantenimiento.

*5.	Que es el elemento Feature (Caracterisica)
R// Es el  que proporciona el encabezado o el marco para el archivo Feature. Tiene un titulo y un texto con una descripción de alto nivel de la función de la aplicación que se detalla en el archivo.

*6.	Con que otro nombre se conoce el Feature?
R// Caracteristica

*7.	Que contiene el elemento Feature?
R// Contiene un listado de Scenarios que componen el feature, los cuales pueden agrupar por tags.

*8.	Que es un Escenario?
R// Un escenario es una lista de pasos a seguir que se darán según el contexto del Guerkin.

*9.	Cuáles son las palabras claves utilizadas en el escenario?
R//	 Given = Dado que
 	When= Cuando
	Then= Entonces

*10.	Que es el Background (Antecedentes)
R// Utilizamos el background para definir precondiciones para cada uno de los escenarios a correr y así no ser repetitivos y focalizar los escenarios en la prueba específica. 

*11.	Que es el Escenario Outline (Esquema del escenario)?
R// Es el que nos permite introducir variables en nuestros escenarios y asi simplificar pruebas que requieren los mismos pasos pero que pueden tener datos variados.

12. Aparte de describir las funcionalidades Gherkin nos va a permitir?
	* Crear una documentación viva a la vez que automatizamos los tests (ok)
	* Crear interfaces gráficas agradables(x)
	* Crear funcionalidad a nuestro software(x)


13. Cuantos idiomas soporta Gherkin?
	* 5(x)
	* solo Ingles(x)
	* mas de 60(ok)

14 Se escribe una prueba y se verifica que las pruebas fallan. 
   A continuación, se implementa el código que hace que la prueba pase satisfactoriamente y seguidamente se refactoriza el código escrito.
   * BDD(x)
   * TDD(ok)
   * ABC(x)
	
15. Qué significa TDD?
	* Test Driven Development o Desarrollo Dirigido por Pruebas (ok)
	* Behaviour Driver Development (x)
	* Train Desktop Drive (x)

16. TDD está basado en 2 prácticas cuales son?
	* Escribir los escenarios posibles y tomar decisiones(x)
	* Refactorizar y escribir las pruebas(x)
	* Escribir las pruebas primero, y Refactorizar después(ok)

17. BDD es una evolución de?
	*TDD(ok)
	*BCD(x)
	*W3C(x)
	
# Cucumber 


1. Como se llama la herramienta que permite ejecutar descripciones funcionales en texto plano como pruebas de software automatizadas.
	* Feature (x)
	* Gherkin(x)
	* Cucumber (ok)
	
2. Sobre que lenguaje de programacion esta escrito Cucumber.
	* Java (x)
	* Ruby(ok)
	* Python (x)
	
3. El lenguaje usado por Cucumber que permite hacer las descripciones funcionales se llama.
	* .Net(x)
	* C#(x)
	* Gherkin (ok)
	
4. Es un proceso de desarrollo de software que trata de combinar los aspectos puramente tecnicos y los de negocio, de manera que tengamos un marco de trabajo, y un marco de pruebas.
	* BDD (ok)
	* DDD(x)
	* TDD (x)

5. Que significa BDD.
	* Diseño Guiado por el Dominio (x)
	* Desarrollo Dirigido por Comportamiento(ok)
	* Desarrollo Dirigido por Pruebas (x)
	
6. Es un Lenguaje Específico para el Negocio, creable especialmente para las descripciones de comportamiento.	
	* Cucumber (ok)
	* Gherkin(x)
	* BDD (x)

7. Cucumber es una de las herramientas que podemos utilizar para automatizar?
	* Pruebas en BDD (ok)
	* Pruebas unitarias (x)
	* Test de rendimiento (x)
	
8. Cucumber nos va permitir ejecutar descripciones funcionales como pruebas de software automatizadas en?
	* Sintaxis de json (x)
	* Formato html (x)
	* Texto Plano (ok)
	
9. Cucumber está escrito en Ruby, aunque tiene implementaciones para casi cualquier lenguaje de programación en cuál de los siguientes no tiene implementación?
	* PHP (x)
	* CSS (ok)
	* JAVA (x)

10. Que necesita Cucumber cuando no sabe como ejecutar sus escenarios?
	* Instrucciones en javascript (x)
	* Defincion de Pasos (ok)
	* Interpretar un ciclo (x)
 
 11. Una de las formas más sencilla de instalar Cucumber para nuestras primeras pruebas es hacerlo en?
	* NodeJS (ok)
	* Laravel (x)
	* Django (x)
 