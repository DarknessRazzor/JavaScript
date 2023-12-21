window.onload = function() {
    var teclado = document.getElementById("teclado");
    for(let teclaActual = 65; teclaActual <= 90;teclaActual++) {
        const tecla = document.createElement("button");
        tecla.innerText = String.fromCharCode(teclaActual);
        tecla.classList.add("tecla");
        teclado.appendChild(tecla);
        tecla.addEventListener("click", agregarLetraUsada);
        tecla.addEventListener("click", agregarUltimaLetra);
    }
    let listaPeliculas = [];
    listaPeliculas.push('Viernes 13', 'Pesadilla antes de Navidad', 'Solo en casa');
    console.log(listaPeliculas);
    let peliculas = listaPeliculas[Math.floor(Math.random() * listaPeliculas.length)];

    let caja = document.getElementById("titulo");
    let tituloPeli = document.createElement("p");
    tituloPeli.innerText = peliculas;
    caja.appendChild(tituloPeli);
}

    
    

    function agregarLetraUsada(){
        interiorLetraUsada.appendChild(this.cloneNode(true));
    }
    function agregarUltimaLetra(){
        interiorUltimaLetra.appendChild(this.cloneNode(true));
        
    }