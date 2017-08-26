var assert = require('chai').assert,
fnsuma = require('./demo').suma,
fnresta = require('./demo').resta,
resultado;

describe('Operaciones aritmeticas', function() {

	describe('Suma a + b', function() {
    	it('suma de dos enteros', function(){
    		resultado= fnsuma(1,2)
      		assert.equal(resultado, 3);
    	});
	});


    describe('Resta a - b', function() {
	    it('resta de dos enteros positivos', function(){
	    	resultado= fnresta(2,2)
	      	assert.equal(resultado, 0);
	    });

	    it('resta de dos enteros negativos', function(){
	    	resultado= fnresta(-2,-2)
	      	assert.equal(resultado, 0);
	    });
  });


});