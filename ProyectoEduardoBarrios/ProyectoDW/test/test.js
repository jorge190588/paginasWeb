var assert = require('chai').assert,
    foo = 'bar',
    funSuma = require('./demo');

var suma;
    //console.log('DEMO  '+funSuma(1,2));

describe('Demo class',function(){
    
    describe('suma',function(){
        it('suma de dos enteros',function(){        
            suma = funSuma(1,2);
            assert.equal(suma,3);
        });
    
    });

});