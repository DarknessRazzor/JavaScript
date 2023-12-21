let botones;
let punto = false;
let operadores = "+-%/x";
let puntito = ".";
let numeros = "0123456789+-%/x";
let estring = "";
let caracterPulsado = "";


window.onload = function () {
  botones = document.getElementsByClassName("boton"); //cogemos todos los botones con el ClassName
  for (let elemento of botones) {
    //recorremos el array ya que al ser un Elements nos almacena en un array todos los elementos
    elemento.addEventListener("mousedown", sombra); //a cada elemento, cada botón le metemos un EventListener para añadir una función a un evento específico, en este caso cuando hagmos click encima añadirá una sombra
    elemento.addEventListener("mouseup", sombra);
    elemento.addEventListener("click", pulsar);
  }
};
function sombra() {
  //funcion para añadir la sombra al hacer click encima de cualquier boton
  this.classList.toggle("sombra"); //el this sirve para coger a lo que le hagamos click (es el ratón) el classList para añadir una clase a lo que hagamos click en este caso, el toggle añade un css si no tiene y lo quita si ya lo tiene
}

document.addEventListener("keydown", pulsar);

function pulsar(e){
  let valor;
  let valorPantalla = document.getElementById("pantalla");
  if(e.type == "keydown") valor = e.key;
  else valor = this.innerText;
  console.log(valor);
  switch(valor){

      case "x":
      case "%":
      case "+":
      case "-":
      case "/":
        agregarOperador(valor);
        break;
      case "C":
      case "c":
        borrarTodo(valor);
        punto = false;
        break;
      case "«":
      case "Backspace":
        borrar(valor);
        break;
      case "=":
      case "Enter":
        resultado(valor);
        break;
      case ".":
        agregarPunto(valor);
        break;
      case "()":
        parentesis(valor);
        break;
      default:
        console.log("NUMERO");
        escribirPantalla(valor);
      }
  }

function ultimo() {
  return pantalla.value[pantalla.value.length-1];
}

function agregarOperador(dato) {
  if(!operadores.includes(ultimo()) && ultimo()!= ".") {
    punto = false;
    escribirPantalla(dato);
  }
}

function escribirPantalla(dato) {
  if(numeros.includes(dato) || operadores.includes(dato) || dato == puntito || dato == "()" || dato == "(") {
    if (pantalla.value == "0") {
      estring = dato;
      pantalla.value = estring; // se carga el 0 al no concatenar (al no tener +=)
    } else {
      estring += dato;
      pantalla.value += dato;
    }
  }
}

function parentesis(valor){
  console.log("PARENTESIS: " + estring);
  estring = "(" +estring+ ")"; //el valor de la pantalla está metido en una variable de tipo String, por eso hacemos que se printee el valor de la pantalla más los paréntesis
  pantalla.value = estring //como estamos trabajando con dos variables, estring y pantalla.value, necesitamos siempre que se vaya a sobreescribir el valor volverle a pasar a pantalla.value su valor cambiado, en este caso pantalla.value=estring;
}

function resultado(valor) {
  pantalla.value = pantalla.value.replaceAll("%", "*1/100*");
  pantalla.value = pantalla.value.replaceAll("x", "*"); //a la pantalla le pasamos el valor con el reemplazo de las x por *, la funcion eval lo coge como multiplicación ya que es un *
  pantalla.value = eval(pantalla.value); // en el caso de pulsar = cogemos el valor de la pantalla (pantalla.value) y con la función eval hacemos operaciones simples a la función eval le pasamos el valor de la pantalla
}

function borrarTodo(valor) {
  pantalla.value = "0"; //inicializa el valor de la pantalla a 0
}

function agregarPunto(dato) {
  if (!punto && !operadores.includes(ultimo())) {
    estring += dato;
    console.log(estring);
    pantalla.value += dato;
    // condición para ver si hay un punto y añadimos una variable boolean que ya está definida como true, lo que nos permitiría escribir
    //ESCRIBO
    punto = true; //una vez se ha escrito, la variable se pondrá en false y ya no se podrá volver a escribir otra coma
  } 
}
function borrar(valor) {
  let pantalla = document.querySelector("input"); //cogemos el primer elemento que sea, en este caso "input", en este caso la pantalla
  let valorPantalla = pantalla.value; //agregamos el value de la pantalla a una variable para trabajar con ella
  pantalla.value = valorPantalla.slice(0, -1); // al value de la pantalla le pasamos la anterior variable con el slice que sirve para cortar, pero en este caso le ponemos cortame desde 0 (osea no cortes nada), y le ponemos -1 para poder acceder a la última posición
  if (pantalla.value == "") {
    // condición para que al acabar de borrar vuelva a poner 0 por defecto en la pantalla y que no se quede vacía
    pantalla.value = "0";
  }
}
