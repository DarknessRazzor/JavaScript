let gruposJugadores = [
  ["futbol", "futbol"],
  ["interpretes", "interpretes"],
  ["dc", "dc"],
  ["starwars", "starwars"],
  ["marvel", "marvel"],
];

//Número de jugadores en cada grupo
let numeroJugadores = 13;

//Número máximo de jugadores por equipo
let maxJugadoresEquipo = 11;

window.onload = function () {
  valorSelect();
  let cajaError = document.getElementById("bloquear");
  cajaError.classList.add("oculto");
  let pantallaError = document.getElementById("mensaje");
  pantallaError.classList.add("oculto");
  selectorJugadores.addEventListener("change", mostrarJugadores);
  selectorJugadores.addEventListener("click", clonarJugadores);
};

//Devuelve un número aleatorio entero entre el mínimo y el máximo indicado, ambos inclusive
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function mostrarJugadores() {
  console.log(this.value);
  let mostrarJugadores = document.getElementById("jugadores");
  for (let i = 1; i <= numeroJugadores; i++) {
    let imagen = document.createElement("img");
    imagen.src = "img/"+this.value+"/"+i+".jpg";
    imagen.classList.add("imagen");
    mostrarJugadores.appendChild(imagen);
  }
}
function clonarJugadores(){
  let campo1 = document.getElementById("equipo1");
  let imagenClonada = this.cloneNode(true);
  imagenClonada.appendChild(campo1);
}

function valorSelect() {
  let jugadores = document.getElementById("selectorJugadores");
  for (value of gruposJugadores) {
    let option = document.createElement("option");
    option.innerText = value[0];
    jugadores.appendChild(option);
  }
}

function jugar() {

}
