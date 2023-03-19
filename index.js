// //esta función debe retornar una promesa
// const mdLinks = (path, options) => {

// }

// module.exports = () => {
//   // ...
// };

// let i = 0;
// setInterval(function(){
//   console.log(i)
//   i++
//   // if (i===5){
//   //   var a=3+z;
//   // }
// }, 1000);
// console.log('segunda instrucción')

// let nombre = process.env.NOMBRE || 'SINNOMBRE';
// let web = process.env.WEB || 'No tengo web'
// console.log(nombre + web);

// function factorial(n){
//   if (n<1){
//     throw new Error ('solo números enteros positivos')
//   }
//   let accunt = 1;
//   for (let i = 1; i<= n; i++){
//     accunt = accunt * i
//   }
//   return accunt
// }
// resultado = factorial(0);
// console.log(resultado);

function soyAsincrona(micallback){
  console.log('Hola, soy una función asíncrona');
  setTimeout(function(){
    console.log('estoy siendo asíncrono')
    micallback();
  }, 1000);
}
function callbackPrueba() {
  console.log('terminando proceso');
}
console.log('iniciando proceso');
soyAsincrona(callbackPrueba);