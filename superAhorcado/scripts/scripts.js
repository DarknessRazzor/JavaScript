//creamos un array donde se guardarán las letras pulsadas
let letrasUsadasArray = [];
let letras = this.innerText;
let peliculaRandom = "";
let extremidad;
let puntuacionDos = 0;

window.onload = function () {
    var teclado = document.getElementById("teclado");
    for (let teclaActual = 65; teclaActual <= 90; teclaActual++) {
        let tecla = document.createElement("button");
        tecla.innerText = String.fromCharCode(teclaActual);
        tecla.classList.add("tecla");
        teclado.appendChild(tecla);
        //añadimos un evento que al hacer click nos diga que letra se ha usado y en este caso la clone donde queramos, en los divs que queramos
        tecla.addEventListener("click", letraUsada);
        tecla.addEventListener("click", destaparLetra);
        tecla.addEventListener("click", fallarLetra);
    }
    //creamos el array con las pelis que queremos, hacemos que coja una peli aleatoria, cogemos el elemento de HTML donde queremos insertar
    //la película, creamos el elemento HTML donde vamos a poner la película, le añadimos datos con el textContent (peliculaOculta que es
    //nuestro string con la pelicula ya ocultada)y por último hacemos que del DIV en este caso cajaPelis, cuelgue un párrafo con datos que queramos
    let peliculas = ['Solo en casa', 'Grinch', 'Pesadilla antes de navidad'];
    peliculaRandom = peliculas[Math.floor(Math.random() * peliculas.length)].toUpperCase();
    let cajaPelis = document.getElementById("printearPeli");
    let parrafo = document.createElement("p");
    //a esta variable le hemos pasado una función que lo que hace es ocultar la película que le pasemos
    let peliculaOculta = ocultarLetras(peliculaRandom);
    parrafo.textContent = peliculaOculta;
    cajaPelis.appendChild(parrafo);
    //cogemos todas las className que tengan como class "extremidad" para coger todas las partes del papa noel
    // hacemos el for para recorrer el array de extremidades y a continuación a cada elemento le pasamos una classList, en este caso
    //un css que hace que las extremidades estén escondidas
    extremidad = document.getElementsByClassName("extremidad");
    for (let elemento of extremidad){
    elemento.classList.toggle("esconderNoel");
}
}

function letraUsada() {
    //comprobamos si lo que hemos hecho click, en este caso las letras de la pantalla NO están dentro del array (sentencia negativa !)
    //en caso de que no estén, la letra pulsada se subirá al array y así el array sabrá las letras que tiene y no dejará repetir letras
    letras = this.innerText;
    if (!letrasUsadasArray.includes(letras)) {
        letrasUsadasArray.push(letras);

        //usamos el cloneNode para clonar lo que sea que pulsemos y se lo enviamos al div donde queremos que aparezca con el appendChild
        //en este caso tenemos dos clonar porque queremos que al pulsar la tecla del teclado por pantalla nos vaya al div Última letra usada
        //y al div Letras usadas
        let letrasClonadas = document.getElementById("letrasClonadas");
        let clonar = this.cloneNode(true);
        letrasClonadas.appendChild(clonar);

        let letraClonada = document.getElementById("letraClonada");
        let clonar2 = this.cloneNode(true);
        //al div de letraClonada le pasamos un innerHTML para igualar a la letra que hagamos click, al no poner +=, estará sobreescribiendo las teclas pusladas
        // le pasamos un valor vacío a letraClonada para que cada vez que clickamos algo nuevo esté vacío y se pueda printear una letra nueva
        letraClonada.innerHTML = "";
        letraClonada.appendChild(clonar2);
    }
}
function ocultarLetras(pelicula) {
    //bucle for para recorrer el tamaño de la pelicula deseada, una vez tiene el tamaño irá recorriendo en la posición [i] en cada iteracción
    //si lo que se encuentra es una letra, la cambiará por un guión, si lo que se encuentra es un espacio, agregará un espacio
    //de está manera conseguimos que la pelicula salga "oculta"
    let peliculaOculta = "";
    for (let i = 0; i < pelicula.length; i++) {
        if (pelicula[i] === " ") {
            let vacio = document.createElement("span");
            vacio.innerHTML = "&nbsp";
            titulo.appendChild(vacio);
        } else {
            let linea = document.createElement("span");
            linea.innerHTML = "_ ";
            titulo.appendChild(linea);
        }
    }
    return peliculaOculta;
}
const cuerpazo = document.getElementById("general");
const caja = document.createElement("div");
const texto = document.createElement("label");
const boton = document.createElement("button");
let puntuacion = 0;

let puntuacionBase = 1000; // Puntuación base por letra acertada
let penalizacionMiembro = 100; // Penalización por cada miembro de Papá Noel

function destaparLetra() {
    let peliculaDestapada = "";
    let letraAcertada = false;
    let letrasTotales = peliculaRandom.replace(/ /g, '').length;//en el string de peliculaRandom reemplazamos los espacios por nada para contar el máximo de letras sin contar los espacios
    //bucle for para recorrer el tamaño de la pelicula random (será el numero de veces que se repetirá el bucle)
   for (let i = 0; i < peliculaRandom.length; i++) {
         //este if comprueba que si en la posición de la pelicula random hay un espacio, se printea un espacio
         if (peliculaRandom[i] === " ") {
             peliculaDestapada += " ";
             // este else if comprueba que si lo que hemos clicado está en alguna posición de la peliculaRandom se añade al string de peliculaDestapada
         } else if (this.innerText === peliculaRandom[i]) {
             peliculaDestapada += peliculaRandom[i];
            //se pasa la variable letraAcertada a true para poder printear la letra
             letraAcertada = true;
             puntuacion++;
         } else {
             peliculaDestapada += "_";
        }
         // este if actualiza el texto de los spans, en este caso si se ha encontrado la letra, se actualiza visualmente el - por la letra
         if (letraAcertada) {
             document.getElementsByTagName("span")[i].innerText = peliculaDestapada[i];
             //cogemos la puntuación y le cambiamos el dato pasandole una funcion
             document.getElementById("puntos").innerText = puntuacionFuncion(letrasFalladas);
             //aqui se inicializa a false para solo printear una unica letra, es un toma y daca entre la letra acertada (true), se printea la letra y se vuelve a false para que solo sea una letra y vuelta a empezar
             letraAcertada = false;
         }
     }
     //este if sirve para ver si la puntuación es igual al total de letras, entonces si coincide es que se ha destapado toda la peli y ha ganado
     if (puntuacion == letrasTotales){
        //añadimos el texto que queremos mostrar con el textContent, le añadimos clases para modificar el estilo, lo colgamos todo del body y así conseguimos una "ventana emergente"
         texto.textContent="HAS GANADO, ENHORABUENA";
         boton.textContent="Volver a jugar";
         caja.classList.add("victoriaDiv");
         texto.classList.add("victoriaLabel");
         boton.classList.add("victoriaBoton");
         document.body.appendChild(caja);
         caja.appendChild(texto);
         caja.appendChild(boton);
         //escondemos el teclado
         teclado.classList.add("esconderTeclado");
        //evento que al hacer click no le pasamos ningun parametro y reinicia la página para volver a jugar
         boton.addEventListener("click", () =>{
            location.reload();
         });
     }
}
function puntuacionFuncion(letrasFalladas){
    //funcion para averiguar la puntuación le incrementamos +1000 por acierto y luego le quitamos 100 puntos a los 1000, entonces el siguiente acierto después de fallar valdrá 900
    puntuacionDos += 1000 - (100 * letrasFalladas);
    return puntuacionDos;
}
let letrasFalladas = 0;
function fallarLetra(){
    //con este if comprobamos si lo que hemos hecho click (en este caso en las letras) no está dentro del string de peliculaRandom (donde tenemos el título de la pelicula)
    if (!peliculaRandom.includes(this.innerText)){
        //al array de extremidades le pasamos la cantidad de fallos que tenemos y le quitamos la clase
        extremidad[letrasFalladas].classList.remove("esconderNoel");
        letrasFalladas++;
    }
    if (letrasFalladas == 10){
        //añadimos el texto que queremos mostrar con el textContent, le añadimos clases para modificar el estilo, lo colgamos todo del body y así conseguimos una "ventana emergente"
        texto.textContent="HAS PERDIDO, LOOSER";
         boton.textContent="Volver a jugar";
         caja.classList.add("derrotaDiv");
         texto.classList.add("derrotaLabel");
         boton.classList.add("derrotaBoton");
         document.body.appendChild(caja);
         caja.appendChild(texto);
         caja.appendChild(boton);
         //escondemos el teclado
         teclado.classList.add("esconderTeclado");
        //evento que al hacer click no le pasamos ningun parametro y reinicia la página para volver a jugar
         boton.addEventListener("click", () =>{
            location.reload();
         });
    }
}