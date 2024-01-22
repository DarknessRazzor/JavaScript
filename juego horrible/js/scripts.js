window.onload = () => {
    //le damos el evento en este caso de hacer click a la función de cargar el dado
    lanzar.addEventListener("click", cargarDado);
}
//esta función carga la cara del dado en base al número random que aparece del 1 al 6, le sumamos+1 para que no pille el 0
function cargarDado(){
    let dadoRand = Math.floor(Math.random()*6+1);
    dado.innerHTML = ""; //con esto limpiamos el dado cada vez que le damos click, así evitamos que se acumulen y se creen dados unos encima de otros
    let imagenDado = document.createElement("img");
    imagenDado.src = "img/"+dadoRand+".png";
    dado.appendChild(imagenDado);
    main.innerHTML = ""; //con esto limpiamos el main de cualquier imagen o chiste que nos cargue, así dependiendo del resultado sale una cosa u otra sin sobrecargar la página
    if(dadoRand%2 == 0){
        totalChistes(); //en caso de el resto dar 0 significa que es par y cargamos un chiste
    } else {
        totalPersonajes(); //si no, cargamos un personaje de rick y morty
    }
}
//función async para que los fetch vayan trabajando ya que no es una respuesta instantánea, así lo dejamos en segundo plano
async function totalPersonajes(){
    let URL = "https://rickandmortyapi.com/api/character";
    await fetch(URL).then(data => data.json()).then(data => { //en este fetch cogemos los datos de la api y los volcamos en un json para poder coger el dato que queramos
        let total = data.info.count;
        let numeroRandom = Math.floor(Math.random()*total); //creamos un numero random entre el total de personajes que tenga la api, en este caso el info.count
        URLtotal = "https://rickandmortyapi.com/api/character/"+numeroRandom;
    });
    await fetch(URLtotal).then(info => info.json()).then(personaje => {//este fetch sirve para los datos volcados pasarselos a la variable personaje, con esta variable podemos trabajar y coger datos
        mostrarPersonajesRick$Morty(personaje);//a la funcion que hemos creado abajo para generar el DOM le pasamos la variable personaje para jugar con los datos
        return personaje;
    });
}
//función async también para cargar los chistes de la api de chucknorris, lo mismo que arriba, volcamos los datos en la variable chistes para poder trabajar con los datos del json
async function totalChistes(){
    let URLChistes = "https://api.chucknorris.io/jokes/random";
    await fetch(URLChistes).then(dato => dato.json()).then(chistes => {
        mostrarChistesChuckNorris(chistes);//a la funcion que hemos creado abajo para generar el DOM le pasamos la variable chiste para jugar con los datos
        return chistes;
    });
}
//Generar la estructura HTML con DOM, pasandole los parametros que queremos que salggan en cada uno de los elementos y haciendo los appendchild pertinentes
function mostrarPersonajesRick$Morty(personaje){

    let divPrincipal = document.createElement("div");
    divPrincipal.classList.add("rickContainer");
    let imagen = document.createElement("img");
    imagen.src = personaje.image;
    divPrincipal.appendChild(imagen);
    
    main.appendChild(divPrincipal);

    let divNombre = document.createElement("div");
    divNombre.classList.add("name");
    divNombre.innerText = personaje.name;
    divPrincipal.appendChild(divNombre);

    let divGenero = document.createElement("div");
    divGenero.classList.add("gender");
    let hGenero = document.createElement("h3");
    hGenero.innerText = "Género";
    let pGenero = document.createElement("p");
    pGenero.innerText = personaje.gender;
    divGenero.appendChild(hGenero);
    divGenero.appendChild(pGenero);
    divPrincipal.appendChild(divGenero);

    let divEspecie = document.createElement("div");
    divEspecie.classList.add("specie");
    let hEspecie = document.createElement("h3");
    hEspecie.innerText = "Especie";
    let pEspecie = document.createElement("p");
    pEspecie.innerText = personaje.species;
    divEspecie.appendChild(hEspecie);
    divEspecie.appendChild(pEspecie);
    divPrincipal.appendChild(divEspecie);

    let divTipo = document.createElement("div");
    divTipo.classList.add("type");
    let hTipo = document.createElement("h3");
    hTipo.innerText = "Tipo";
    let pTipo = document.createElement("p");
    pTipo.innerText = personaje.type;
    if(personaje.type == ""){
         pTipo.innerText = "Desconocido";
    }
    divTipo.appendChild(hTipo);
    divTipo.appendChild(pTipo);
    divPrincipal.appendChild(divTipo);
}
//lo mismo que en la de arriba, generar DOM y añadir datos que queramos
function mostrarChistesChuckNorris(chistes){
     let divPrincipalChuck = document.createElement("div");
     divPrincipalChuck.classList.add("chuckContainer");

     main.appendChild(divPrincipalChuck);

     let hChuck = document.createElement("h3");
     hChuck.innerText = chistes.categories;
     if (chistes.categories == ""){
        hChuck.innerText = "No tiene categoría";
     }
     let pChuck = document.createElement("p");
     pChuck.innerText = chistes.value;
     divPrincipalChuck.appendChild(hChuck);
     divPrincipalChuck.appendChild(pChuck);
}