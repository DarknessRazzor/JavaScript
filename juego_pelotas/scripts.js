//Variables para la seleccion por parte de la maquina, del color a eliminar
let colores = ["rojo", "verde", "azul"];
let color;

//Cronometro
let horas = 0;
let minutos = 0;
let segundos = 0;
let intervalo;

//Elementos HTML
let cronometro;
let tablero;
let jugar;
let queEliminar;

//Dimensiones de la pantalla, para establecer donde tienen que crearse las pelotas
let anchoPantalla;
let altoPantalla;

//Selector de numero de pelotas por partida
let numeroPelotas = 0;

//Modos de juego
let modoTodas = false;
let modoUna = false;

let cuentaPelotas = 0;

//Modo eliminar un color
let fallos = 0;
let aciertos = 0;

window.onload = function () {
  /*añadimos en base a la seleccion dentro del select un valor a la variable numeroPelotas*/
  numeroPelotas = document.getElementById("cantidad");

  //Resolucion pantalla
  //con el valor screen le pasamos que se acople a la pantalla donde se abra sin
  //determinarle un valor especifico y asi se acopla a todas las pantallas
  anchoPantalla = screen.width;
  altoPantalla = screen.height;

  /*ELEMENTOS HTML QUE QUEREMOS COGER PARA POSTERIORMENTE AÑADIRLES CLASES O EVENTOS*/
  //tablero de juego donde van a aparecer las pelotas
  tablero = document.getElementById("tablero");
  //Cronometro donde iremos sumando los segundos, minutos y horas en este caso
  cronometro = document.getElementById("hms");
  //Boton para iniciar el juego
  jugar = document.getElementById("jugar");
  //Selector de modos de juego
  queEliminar = document.getElementById("queEliminar");

  /*AL BOTON DE JUGAR LE AÑADIMOS UN EVENTO DE INICIAR EL JUEGO CUANDO HAGAMOS CLICK*/
  jugar.addEventListener("click", comenzar);
  /*al cronometro le pasamos el texto que queremos que ponga en el con innerText*/
  cronometro.innerText = "00:00:00";

  botonesFormulario();
};

//Funcion para el funcionamiento de los botones de modo
function botonesFormulario() {
  let botones = document.getElementById("queEliminar").getElementsByTagName("div");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", seleccionar);
  }
}

//Funcion para colorear los botones de modo
function seleccionar() {
  let botones = document.getElementById("queEliminar").getElementsByTagName("div");
  for (let i = 0; i < botones.length; i++) {
    /*con el toggle le añadimos una clase css si no la tiene y se la quitamos si ya la tiene*/
    botones[i].classList.toggle("seleccionado");
  }
}

//Funcion que genera el color a eliminar
function avisoColor() {
  //cogemos un numero aleatorio entre 0 y 1, ya que el maximo es 2 pero es exluyente
  let numero = aleatorio(2);
  console.log("posicion: " + numero);
  color = colores[numero];
  /*creamos elementos y un node de texto*/
  let texto = document.createTextNode("Tienes que eliminar las pelotas de color:"
  );
  let pelota = document.createElement("div");
  let boton = document.createElement("button");
  let modo = document.getElementById("modo");
  /*le añadimos un texto al boton*/
  boton.innerText = "Jugar";
  /*a dicho boton anterior le pasamos un evento que en este caso será generar las pelotas para jugar*/
  boton.addEventListener("click", generarPelotas);
  /*a la clase css de pelota ya existente "selectorColor" le añadimos otro parametro*/
  pelota.className = "selectorColor " + color;
  modo.innerHTML = "";
  /*todo cuelga de modo porque es el div general que aparece una vez has seleccionado el modo de juego y donde te pone las instrucciones*/
  modo.appendChild(texto);
  modo.appendChild(pelota);
  modo.appendChild(boton);
  modoUna = true;
}
/*************************************CODIGO A COMPLETAR****************************************/
function comenzar() {
  /**Seleccionamos el numero de pelotas.
    Comprobamos el modo de juego y, o bien vamos a avisoColor() que nos genera un color que eliminar, o bien vamos
    directamente a generarPelotas()**/

  /*coge todos los elementos con clase seleccionado y cogemos el ID de la posición 0*/
  let modoJuego = document.getElementsByClassName("seleccionado")[0].id;

  if (modoJuego === "modoTodas") {
    generarPelotas();
    modoTodas = true;
  } else {
    avisoColor();
  }
}

//Funion que genera el numero de pelotas seleccionado
function generarPelotas() {
  /**En funcion del modo de juego, crearemos todas con color aleatorio, o el 50% del color indicado, y el resto de
    forma aleatoria.
    Las pelotas deben tener unas dimensiones entre 10px y 200px de lado, y deben aparecer dentro de las dimensiones
    del tablero.
    Comienza a andar el cronometro**/
  cronometrar();
  modo.classList.add("ocultar");
  for (let i = 0; i < numeroPelotas.value; i++) {
    crearPelota();
  }
}

function pintar() {
  if (modoUna) {
    if (color === "rojo") {
      /*evitamos que si cogemos el color rojo, las siguientes pelotas tengan color rojo y asi con el resto, verde y azul*/
      colorRandom = "rgb(" + 0 + ", " + aleatorio(0, 255) + ", " + aleatorio(0, 255) + ")";
    } else if (color === "verde") {
      colorRandom = "rgb(" + aleatorio(0, 255) + ", " + 0 + ", " + aleatorio(0, 255) + ")";
    } else if (color === "azul") {
      colorRandom = "rgb(" + aleatorio(0, 255) + ", " + aleatorio(0, 255) + ", " + 0 + ")";
    }
    return colorRandom;
  } else {
    /*el modo eliminarTodas es eliminar todas la pelotas de todos los colores*/
    colorRandom = "rgb(" + aleatorio(0, 255) + " " + aleatorio(0, 255) + " " + aleatorio(0, 255) + ")";
    return colorRandom;
  }
}

let contador = 0;
function darColor(pelota) {
  /*cogemos la mitad de las pelotas de la pantalla*/
  let mitad = numeroPelotas.value / 2;
  /*mientras el contador, que está a cero, sea menor que la mitad de las pelotas que hay en pantalla pintará la mitad de las pelotas*/
  if (contador < mitad) {
    pelota.style.background = pintar();
    contador++;
  } else {
    /*cuando el contador llega a la mitad de las pelotas, la otra mitad se generará del color que le hemos generado anteriormente (rojo, verde o azul)*/
    pelota.classList.add(color);
  }
}

//Funcion que crea cada pelota con los parametros ancho, alto y posicion de forma aletoria y la devuelve.
function crearPelota() {
  /*creamos el elemento div que serán nuestras pelotas*/
  let pelota = document.createElement("div");
  /*genera valores aleatorios para el top y el left de las pelotas top(posición vertical) left(posicion horizontal*/
  let top = aleatorio(0, 80);
  let left = aleatorio(0, 80);
  /*este random es para generar las pelotas de distinto tamaño, para pasarle los pixeles aleatorios de width y heigth*/
  let random = aleatorio(10, 200);
  /*aqui añadimos los numeros generados en el top y left aleatorio más % para que el css los coja y los pueda añadir como atributo del css*/
  pelota.style.top = top + "%";
  pelota.style.left = left + "%";
  /*le añadimos los valores random al width y al height a la vez para que coincidan entre ellas y sean esfericas*/
  pelota.style.width = random;
  pelota.style.height = random;
  pelota.classList.add("pelota");
  /*colgamos las pelotas del tablero principal donde queremos que aparezcan las pelotas*/
  tablero.appendChild(pelota);
  /*añadimos un evento cuando hagamos dobleclick para borrar las pelotas*/
  pelota.addEventListener("click", eliminarPelota);
  /*si el modo de juego es modoUna establece el color a la pelota*/
  if (modoUna) {
    darColor(pelota);
  } else {
    /*si es el otro modo de juego*/
    pelota.style.background = pintar();
  }
  return pelota;
}

function eliminarPelota() {
  //Eliminamos la pelota
  //Sumamos aciertos en funcion del modo
  this.classList.add("ocultar");
  let aciertoPantalla = document.getElementById("aciertos");
  if (modoUna) {
    /*si el modoUna es eliminar rojo, color contiene rojo, si clickas una verde, al no ser rojo FALLA*/
    if (!this.classList.contains(color)) {
      fallos = document.getElementById("fallos");
      fallos.innerText++;
    } else {
      aciertoPantalla.innerText++;
      aciertos++;
    }
    cuentaPelotas++;
    if (aciertos >= numeroPelotas.value / 2) {
      finPartida();
    }
  } else {
    /*vamos sumando aciertos y pelotas borradas, cuando las pelotas eliminadas sea igual al numero de pelotas que habia en el tablero se acaba la partida*/
    aciertoPantalla.innerText++;
    cuentaPelotas++;
    if (cuentaPelotas >= numeroPelotas.value) {
      finPartida();
    }
  }
}

//Funcion que convierte a segundos en funcion de lo que indiquen las variables horas, minutos y segundos.
function convertirASegundos() {
  let resultado = segundos + minutos * 60 + horas * 3600;
  return resultado;
}

/*********************************************FIN CODIGO A COMPLETAR**************************/
function finPartida() {
  parar();
  let mensajeFinal;
  if (modoUna)
    mensajeFinal = "Has eliminado " + cuentaPelotas + " pelotas, " + aciertos + " de color " + color + ", en " + convertirASegundos() + " segundos";
  else
    mensajeFinal = "Has eliminado " + cuentaPelotas + " pelotas, en " + convertirASegundos() + " segundos";
    tablero.innerHTML = mensajeFinal;
}

function aleatorio(max, min) {
  if (min) return Math.round(Math.random() * (max - min) + min);
  else return Math.round(Math.random() * max);
}

/**********************CRONOMETRO***************************/
//Comienza a cronometrar
function cronometrar() {
  crearReloj();
  intervalo = setInterval(crearReloj, 1000);
}

function crearReloj() {
  let hAux, mAux, sAux;
  segundos++;
  if (segundos > 59) {
    minutos++;
    segundos = 0;
  }
  if (minutos > 59) {
    horas++;
    minutos = 0;
  }
  if (horas > 24) horas = 0;

  if (segundos < 10) sAux = "0" + segundos;
  else sAux = segundos;
  if (minutos < 10) mAux = "0" + minutos;
  else mAux = minutos;
  if (horas < 10) hAux = "0" + horas;
  else hAux = horas;

  cronometro.innerText = hAux + ":" + mAux + ":" + sAux;
}
//Detiene el cronometro
function parar() {
  clearInterval(intervalo);
}
