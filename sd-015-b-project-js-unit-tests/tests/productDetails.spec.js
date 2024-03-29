const assert = require('assert');
const productDetails = require('../src/productDetails');

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  OBS: Lembre-se que você não precisa se preocupar com o describe e o it por enquanto, isso será aprendido posteriormente.
*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    // assert.fail();
    // ESCREVA SEUS TESTES ABAIXO:
    // Teste que o retorno da função é um array.
    const productDetail = productDetails('carro', 'bicicleta');
    assert.strictEqual(Array.isArray(productDetail), true);

    // Teste que o array retornado pela função contém dois itens dentro.
    const tamanho = productDetails('carro', 'bicicleta');
    assert.strictEqual(tamanho.length, 2);

    // Teste que os dois itens dentro do array retornado pela função são objetos.
    const values = Object.values(productDetails('carro', 'bicicleta'));
    assert.strictEqual(typeof values, 'object');

    // Teste que os dois objetos são diferentes entre si.
    const obj = productDetails('carro', 'bicicleta');
    assert.notDeepStrictEqual(obj[0], obj[1]);

    // Teste que os dois productIds terminam com 123.
    const product = productDetails('', '');
    assert.deepStrictEqual(product[0].details.productId, product[1].details.productId);
  });
});
