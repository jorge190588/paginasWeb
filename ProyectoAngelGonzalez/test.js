var chai= require('chai'),
fnlistarJuegos= require('./demo').listarJuegos,
assert= chai.assert;


describe('Prueba  de Testing de mi Proyecto',function(){
	it('Prueba de igualdad', function(){
		assert.equal(20,20);
	});
});

describe('Prueba para ver Funcionamiento de listar Juegos',function(){
	it('Listar juegos',function(){
		fnlistarJuegos(function(err,results,fields){
			console.log("listar juegos ");
		});
	});
});




//npm install -g mocha para instalar


//luego se configura el proyecto en el package.json
//" script":{
//	"test"


/*}

var assert= require('chai').assert,
foo= 'bar';

describe('Demo class', function() {

describe('suma', function() {

	it('suma de dos enteros', function(){
		assert.typeOf(foo, 'string');
	});

	it('suma de dos enteros', function(){
		assert.typeOf(foo, 'int');
	});

  )};

});*/
 