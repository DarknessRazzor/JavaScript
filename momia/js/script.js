let columnas = 23;
let filas = 15;
let contenedorMapa = [];
let posNinotX = 0;
let posNinotY = 9;
let vertices = [
  [1, 1],
  [1, 5],
  [1, 9],
  [1, 13],
  [1, 17],
  [4, 1],
  [4, 5],
  [4, 9],
  [4, 13],
  [4, 17],
  [7, 1],
  [7, 5],
  [7, 9],
  [7, 13],
  [7, 17],
  [10, 1],
  [10, 5],
  [10, 9],
  [10, 13],
  [10, 17]
];

window.onload = function () {
  crearPlano();
  contenedorMapa[posNinotX][posNinotY].classList.add("ninot");
  document.addEventListener("keydown", movimiento);
};

function crearPlano() {
  let tablero = document.createElement("div");
  tablero.id = "plano";

  document.body.appendChild(tablero);

  for (let i = 0; i < filas; i++) {
    let fila = [];

    for (let j = 0; j < columnas; j++) {
      let cajita = document.createElement("div");
      cajita.className = "cajita";
      fila.push(cajita);
      tablero.appendChild(cajita);

      if (i == 0 || i == filas - 1 || j == 0 || j == columnas - 1) {
        if (posNinotX == i && posNinotY == j) {
          cajita.classList.add("camino");
        } else {
          cajita.classList.add("fuera");
        }
      } else if (j % 4 == 1 || i % 3 == 1) {
        cajita.classList.add("camino");
      } else {
        cajita.classList.add("columna");
      }
    }
    contenedorMapa.push(fila);
  }
}
function movimiento(ev) {
  switch (ev.key) {
    case "ArrowLeft":
      mover(posNinotX, posNinotY - 1);
      break;
    case "ArrowRight":
      mover(posNinotX, posNinotY + 1);
      break;
    case "ArrowUp":
      mover(posNinotX - 1, posNinotY);
      break;
    case "ArrowDown":
      mover(posNinotX + 1, posNinotY);
      break;
    default:
      break;
  }
}
/*Función para moverse e ir printeando lo que queramos, cada vez que se mueve se quita el muñeco y se ponen las huellas y luego se vuelve a printear el muñeco
en la siguiente posición */
function mover(x, y) {
  if (contenedorMapa[x][y].classList.contains("camino")) {

    contenedorMapa[0][9].classList.remove("camino");
    contenedorMapa[posNinotX][posNinotY].classList.remove("ninot");
    contenedorMapa[posNinotX][posNinotY].classList.add("pasos");
    contenedorMapa[x][y].classList.add("ninot");
    posNinotX = x;
    posNinotY = y;
    recorrerVertices();
  }
}

/*Recorre la caja y comprueba si las posiciones por donde ha pasado contiene pasos, si contiene pasos sumamos hasta 14 que es el máximo de pasos que 
puede tener una caja alrededor */
function recorrerCaja(x, y) {
  let contador = 0;
  for (let i = x; i < x + 4; i++) {
    for (let j = y; j < y + 5; j++) {
      if (contenedorMapa[i][j].classList.contains("pasos")) {
        contador++;
      }
      /*Comprobamos cuando el contador sea igual a 14 y destapamos las posiciones, que en este caso son los divs naranjas */
    }
  }
  if (contador == 14) {
    visualizar(x + 1, y + 1);
  }
}
/*Recorremos las columnas para saber si están cubiertas de pasos */
function visualizar(x, y) {
  for (let i = x; i < x + 2; i++) {
    for (let j = y; j < y + 3; j++) {
      contenedorMapa[i][j].classList.add("descubrir");
    }
  }
}
/*Recorre el array de vertices y le pasamos la función de recorrer caja con las posiciones X Y que son los index 0 y 1 del array de vertices */
function recorrerVertices() {
  for (vertice of vertices) {
    recorrerCaja(vertice[0], vertice[1]);
  }
}
