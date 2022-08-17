const str = 'SKU: MLB1532308540 | NAME: Computador Completo Fácil Intel I3 04 Gb Ddr3 Ssd 120 Gb | PRICE: $1938.74';
const price = str.split('|');
console.log(price);
console.log(price[0].slice(5));
console.log(price[1].slice(7));
console.log(price[2].slice(9));
console.log(str.split('$')[1]);