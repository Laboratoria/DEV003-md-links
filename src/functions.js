// el path es la ruta absoluta o relativa al directorio 

function saludar () {
    console.log ('hola')
};

// con esto exportamos la función que creamos
module.exports = {
    saludar,
    prop1:'Qué tal?'
}
