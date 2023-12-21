 for (let i = 0; i < peliculaRandom.length; i++) {
        if (peliculaRandom[i] === " ") {
            peliculaDestapada += " ";
        } else if (this.innerText === peliculaRandom[i]) {
            peliculaDestapada += peliculaRandom[i];
            letraAcertada = true;
            puntuacion += puntuacionBase;
        } else {
            peliculaDestapada += "_";
        }
    }

    // Actualizar el texto de los spans
    for (let i = 0; i < peliculaRandom.length; i++) {
        if (letraAcertada && peliculaRandom[i] === this.innerText) {
            document.getElementsByTagName("span")[i].innerText = peliculaDestapada[i];
        }
    }

    // Actualizar la puntuación en el elemento con id="puntos"
    document.getElementById("puntos").innerText = puntuacion.toString();

    if (!letraAcertada) {
        // Restar puntos por penalización si la letra no fue acertada
        puntuacion -= penalizacionMiembro;
        document.getElementById("puntos").innerText = puntuacion.toString();
    }