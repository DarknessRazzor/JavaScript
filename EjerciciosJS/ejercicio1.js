/**
 * Ejercicio 1
Escribir un programa que en primera instancia nos pida el número de elementos de un array, y en
segunda cada uno de ellos (números enteros).
Al finalizar deberá decir cuál es el número más alto.
 */

let array = [];
let elementos = prompt("¿De cuantos elementos quieres el array?");
let numMax = Number.MAX_VALUE * -1;

for (let i = 1; i <= elementos; i++) {
  let numeros = prompt("Introduce un número: ");

  array.push(numeros);
  if(numMax > numeros){
    numMax = numeros;
  }
}


console.log(array);
console.log("El número más alto es: "+numMax);
