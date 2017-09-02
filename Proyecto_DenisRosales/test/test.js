var assert  = require('chai').assert,
foo = 'bar',
fnsuma= require('./demo'),
suma;

describe('Demo class',function() {

    describe('Suma', function() {
        
        it('suma de dos enteros', function(){
            suma=fnsuma(1,2)
            assert.equal(suma, 3);
        });

    });

});