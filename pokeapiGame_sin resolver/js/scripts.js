let totalCartas = 10;
let pokemons;
let cartasMaquina = [];
let cartasJugador = [];
let bule = true;

window.onload = async () => {
  cartel.classList.add("ocultar");
  await cargarPokemons();
  quienSale();
};
async function cargarPokemons() {
  let iniUrl = "https://pokeapi.co/api/v2/pokemon";
  let totalUrl;
  let total;

  await fetch(iniUrl)
    .then((data) => data.json())
    .then((info) => {
      total = info.count;
      totalUrl = "https://pokeapi.co/api/v2/pokemon/?limit=" + total;
    });

  await fetch(totalUrl)
    .then((data) => data.json())
    .then((info) => {
      pokemons = info.results;
    });
  let pokemonsSeleccionados = [];
  let i = 0;

  while (i < totalCartas) {
    let pos = Math.floor(Math.random() * total);

    if (pokemonsSeleccionados[pos] != "X") {
      pokemonsSeleccionados[pos] = "X";

      let cartaPokemon = await cargarPokemon(pokemons[pos].url);
      if (i % 2 === 0) {
        if (cartaPokemon[0]) cartasJugador.push(cartaPokemon);
      } else {
        if (cartaPokemon[0]) cartasMaquina.push(cartaPokemon);
      }

      if (cartaPokemon[0]) i++;
    }
  }
  cargarCartas();
}

async function cargarPokemon(url) {
  let pokemon = [];
  await fetch(url)
    .then((data) => data.json())
    .then((info) => {
      pokemon.push(info.base_experience);
      pokemon.push(info.name);
      pokemon.push(info.sprites.other["official-artwork"].front_default);
    });
  return pokemon;
}

function cargarCartas() {
  for (let i = 0; i < cartasJugador.length; i++) {
    let cartaJugador = document.createElement("div");
    cartaJugador.classList.add("carta");

    let experiencia = document.createElement("div");
    experiencia.classList.add("experiencia");
    experiencia.innerText = cartasJugador[i][0];
    cartaJugador.appendChild(experiencia);

    let carta = document.createElement("img");
    carta.src = cartasJugador[i][2];
    cartaJugador.appendChild(carta);

    let nombre = document.createElement("div");
    nombre.innerText = cartasJugador[i][1];
    cartaJugador.appendChild(nombre);

    cartaJugador.addEventListener("click", lanzarCarta);
    player.appendChild(cartaJugador);
  }
  for (let i = 0; i < cartasMaquina.length; i++) {
    let cartaMaquina = document.createElement("div");
    cartaMaquina.classList.add("carta");

    let experiencia = document.createElement("div");
    experiencia.classList.add("experiencia");
    experiencia.innerText = cartasMaquina[i][0];
    cartaMaquina.appendChild(experiencia);

    let carta = document.createElement("img");
    carta.src = cartasMaquina[i][2];
    cartaMaquina.appendChild(carta);

    let nombre = document.createElement("div");
    nombre.innerText = cartasMaquina[i][1];
    cartaMaquina.appendChild(nombre);

    let cartaD = document.createElement("img");
    cartaD.classList.add("dorso");
    cartaD.src = "img/dorso.png";
    cartaMaquina.appendChild(cartaD);

    machine.appendChild(cartaMaquina);
  }
}

function juegaMaquina() {
  if(bule){
  let cartaMaquinaLanzar = document.querySelectorAll("#machine .carta");
  let cartita = cartaMaquinaLanzar[Math.floor(Math.random() * cartaMaquinaLanzar.length)];
  cartita.querySelector("img.dorso").remove();
  jugadaMachine.appendChild(cartita);

  let cartasSobreElTapete = play.querySelectorAll(".carta").length;
  if (cartasSobreElTapete >= 2) comprobarJugada();
  }
}

function lanzarCarta() {
  jugadaPlayer.appendChild(this);
  this.removeEventListener("click", lanzarCarta);

  let cartasSobreElTapete = play.querySelectorAll(".carta").length;
  return cartasSobreElTapete >= 2 ? comprobarJugada() : setTimeout(juegaMaquina, 1500);
  if (cartasSobreElTapete >= 2) comprobarJugada();
  else setTimeout(juegaMaquina, 1500);
}

function quienSale() {
  let juegaLaMaquina = Math.floor(Math.random() * 2);
  console.log(juegaLaMaquina);
  if (juegaLaMaquina) {
    juegaMaquina();
  }
}

function comprobarJugada() {
  let tiradaJugador = parseInt(
    document.querySelector("#jugadaPlayer > .carta > .experiencia").innerText
  );
  let tiradaMaquina = parseInt(
    document.querySelector("#jugadaMachine > .carta > .experiencia").innerText
  );
  let totalCartas = play.querySelectorAll(".carta");

  if (tiradaJugador > tiradaMaquina) {
    for (cartones of totalCartas) {
      cartasPlayer.appendChild(cartones);
      totalPlayer.innerText = parseInt(totalPlayer.innerText) + parseInt(cartones.querySelector(".experiencia").innerText);
    }
    comprobarGanador();
  } else {
    for (cartones of totalCartas) {
      cartasMachine.appendChild(cartones);
      totalMachine.innerText = parseInt(totalMachine.innerText) + parseInt(cartones.querySelector(".experiencia").innerText);
    }
    setTimeout(juegaMaquina, 1500);
    comprobarGanador();
  }
}
function comprobarGanador() {
  let puntuacionJugador = parseInt(totalPlayer.innerText);
  let puntuacionMaquina = parseInt(totalMachine.innerText);
  if (player.querySelectorAll(".carta").length == 0 && machine.querySelectorAll(".carta").length == 0 || puntuacionJugador >= 1000 || puntuacionMaquina >= 1000) {
    bule = false;
    if (puntuacionJugador > puntuacionMaquina) {
      cartel.classList.remove("ocultar");
      cartel.innerText = "Ha ganado el jugador";
    } else {
      cartel.classList.remove("ocultar");
      cartel.innerText = "Ha ganado la maquina";
    }
  }
}
