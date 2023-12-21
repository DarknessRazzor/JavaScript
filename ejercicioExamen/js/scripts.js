let gruposJugadores = [
  ["Futbolistas", "futbol"],
  ["Intérpretes", "interpretes"],
  ["DC", "dc"],
  ["Star Wars", "starwars"],
  ["Marvel", "marvel"],
];

//Número de jugadores en cada grupo
let numeroJugadores = 13;

//Número máximo de jugadores por equipo
let maxJugadoresEquipo = 11;

window.onload = function () {
  cargarArray();
  bloquear.classList.add("oculto");
  mensaje.classList.add("oculto");
  /*el evento change se usa para los select al cambiar entre opciones*/
  selectorJugadores.addEventListener("change", mostrarJugadores);
};
function cargarArray() {
  /*usamos un foreach para pasar los elementos de un array a una variable, luego creamos el elemento option y le pasamos un texto predeterminado,
    en este caso le estamos pasando la posición 0 del array como texto predeterminado y el value la posición 1 que comparte nombre con las carpetas,
    finalmente le hacemos que cuelgue el option del selector*/
  let jugadores = document.getElementById("selectorJugadores");
  for (value of gruposJugadores) {
    let option = document.createElement("option");
    option.innerText = value[0];
    option.value = value[1];
    jugadores.appendChild(option);
  }
}
function mostrarJugadores() {
  jugadores.innerText = "";

  /*if que commprueba si el valor es vacio y no printea nada, si no es vacío hace el for*/
  if (selectorJugadores.value != "") {
    /* este for genera tantas iteracciones como le pasemos, en este caso numeroJugadores que es 13*/
    for (let i = 1; i <= numeroJugadores; i++) {
      /*creamos el elemento imagen y le pasamos un link con el src, en este caso del valor que escojamos con el this, luego hacemos que cuelgue la imagen donde queremos que se muestren*/
      let imagen = document.createElement("img");
      imagen.src = "img/" + this.value + "/" + i + ".jpg";
      imagen.classList.add("jugador");
      jugadores.appendChild(imagen);
      imagen.addEventListener("dblclick", moverJugadores);
    }
  }
}
function moverJugadores() {
  this.removeEventListener("dblclick", moverJugadores);
  if (selectorEquipo.value == "equipo1") {
    equipo1.getElementsByClassName("campo")[0].appendChild(this);
  } else {
    equipo2.getElementsByClassName("campo")[0].appendChild(this);
  }
}

//Devuelve un número aleatorio entero entre el mínimo y el máximo indicado, ambos inclusive
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
