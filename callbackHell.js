function hola(nombre, micallback){
    setTimeout(function(){
        console.log('hola ' + nombre);
        micallback(nombre);
    },1500);
}
function hablar (callbackhablar){
    setTimeout(function(){
        console.log('blablablabalbalblarbla');
        callbackhablar();
    }, 1000)
}
function adios(nombre, otrocallback){
    setTimeout(function(){
        console.log('adios '+ nombre);
        otrocallback();
    }, 1000)
}

// ------------------------------
// console.log('inicializando proceso...');
// hola('diana', function(nombre) {
//     hablar( function () {
//         adios(nombre, function(){
//             console.log('Terminando proceso...');
//         });
//     }) 
// });
// ------------------------------------

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

//---------------promesas
