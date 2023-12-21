let reproducir = false;
let silencio = false;
let contador = 10;
window.onload = () => {
  player.addEventListener("click", pausaPlay);
  resetear.addEventListener("click", reiniciar);
  silenciar.addEventListener("click", mutear);
  masVolumen.addEventListener("click", subirVolumen);
  menosVolumen.addEventListener("click", bajarVolumen);
  adelantar.addEventListener("click", avanzar10);
  retrasar.addEventListener("click", atrasar10);
  let videos = document.getElementsByTagName("video");
  for (video of videos) {
    video.addEventListener("click", cambiarVideo);
  }
  setInterval(segundos, 1000);
};

let rep = 0;
function pausaPlay() {
  if (reproducir == false) {
    rep = setInterval(progreso, 1);
    medio.play();
    reproducir = true;
  } else {
    clearInterval(rep);
    medio.pause();
    reproducir = false;
  }
}
function reiniciar() {
  medio.load();
}
function mutear() {
  if (silencio) {
    medio.volume = 1;
    silencio = false;
  } else {
    medio.volume = 0;
    silencio = true;
  }
}
function subirVolumen() {
  medio.volume += 0.1;
}
function bajarVolumen() {
  medio.volume -= 0.1;
}
function avanzar10() {
  medio.currentTime += 10;
}
function atrasar10() {
  medio.currentTime -= 10;
}
function cambiarVideo() {
  /*Para poder intercambiar valores, en este caso src de vídeos para intercambiar los vídeos, asignamos el valor principal a una variable
  luego a ese valor le añadimos lo que cliquemos y de nuevo a ese valor le añadimos la primera variable*/
  let aux = medio.src;
  medio.src = this.src;
  this.src = aux;
  bloqueador.classList.remove("oculto");
  mensaje.classList.remove("oculto");
  contador = 10;
  segundos();
}
function progreso() {
  carga.value = medio.currentTime * 10000;
  carga.max = medio.duration * 10000;
}
function quitarAnuncio() {
  x.addEventListener("click", () => {
    bloqueador.classList.add("oculto");
    mensaje.classList.add("oculto");
  });
}
function segundos() {
  document.getElementById("cero").innerHTML = contador;
  if (contador == 0) {
    quitarAnuncio();
  } else {
    contador -= 1;
    setTimeout("segundos()", 10000);
  }
}
