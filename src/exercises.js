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

// function soyAsincrona(micallback){
//     console.log('Hola, soy una función asíncrona');
//     setTimeout(function(){
//       console.log('estoy siendo asíncrono')
//       micallback();
//     }, 1000);
//   }
//   function callbackPrueba() {
//     console.log('terminando proceso');
//   }
//   console.log('iniciando proceso');
//   soyAsincrona(callbackPrueba);
  

// function hola(nombre, micallback){
//     setTimeout(function(){
//         console.log('hola ' + nombre);
//         micallback(nombre);
//     },1500);
// }
// function hablar (callbackhablar){
//     setTimeout(function(){
//         console.log('blablablabalbalblarbla');
//         callbackhablar();
//     }, 1000)
// }
// function adios(nombre, otrocallback){
//     setTimeout(function(){
//         console.log('adios '+ nombre);
//         otrocallback();
//     }, 1000)
// }

// ------------------------------ recursividad
// console.log('inicializando proceso...');
// hola('diana', function(nombre) {
//     hablar( function () {
//         adios(nombre, function(){
//             console.log('Terminando proceso...');
//         });
//     }) 
// });
// ------------------------------------ callbacks
/*
function conversacion (nombre, veces, callback){
    if (veces>0){
        hablar(function(){
            conversacion(nombre, --veces, callback);
        });
    }else{
        callback(nombre, function(){
            console.log('Proceso terminado')
        });
    }
}

console.log('inicia proceso...');
hola('diana',function(nombre){
    conversacion(nombre, 3, adios);
})
*/
//---------------promesas

function hola(nombre){
    return new Promise (function(resolve, reject){
        setTimeout(function(){
            console.log('hola ' + nombre);
            resolve(nombre);
        },1500);
    });
}
function hablar (){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('blablablabalbalblarbla');
            }, 1000)
    });    
}

function adios(nombre){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('adios '+ nombre)
            resolve(); // es importante poner para que pueda funcionar la siguiente función
        }, 1000);
    });
}

console.log('iniciando el proceso');
hola('diana')
    .then(adios)
        .then((nombre) => {
            console.log('terminado el proceso');// se ejecuta cuando adios () ser resuelve
        });


// ------------ Expresiones regulares---------------------
const regExp = /http:\/\//

var url_con_qs = 'https://www.miurl.com.co/path/path/page1/login?execution=sp1',
  url_sin_qs = 'https://www.miurl.com.co/path/path2/page2/login',

  ruta1 = url_con_qs.split('?')[0].split('/').slice(-2).join('/'),
  ruta2 = url_sin_qs.split('?')[0].split('/').slice(-2).join('/');

  console.log('url con qs', ruta1);
  console.log('url sin qs', ruta2);

  const rectangle = {
    radius: 10
};
const style = {
    Backcolour: 'red'
};
const solidRectangle = {
    ...rectangle,
    ...style
};
console.log(solidRectangle);

