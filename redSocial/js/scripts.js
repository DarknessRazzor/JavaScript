//SELECT con los usuarios
let usuariosSel;
//JSON con todos los usuarios
let usuarios;

//Div donde cargaremos los datos del usuario seleccionado
let datosUsuarios;

//Div donde tenemos los botones. Permanecerá oculto mientras no haya seleccionado un usuario
let botonera;

//Div donde mostraremos los posts
let zonaPosts;

//Div donde mostraremos las fotos;t
let zonaAlbums;

//Div donde mostraremos las fotos;
let zonaFotos;

//Boton Posts
let mostrarPosts;

//Boton Fotos
let mostrarFotos;

let idUser = 0;

var parametros = {
  tipo: "",
  clase: "",
  id: "",
  texto: "",
  src: "",
  href: "",
  value: "",
};

window.onload = async function () {
  //Seleccionamos el SELECT
  usuariosSel = document.querySelector("#usuarios");
  //Añadimos change al SELECT
  usuariosSel.addEventListener("change", mostrarDatosUsuario);
  //Seleccionamos el div donde cargaremos los datos de los usuarios.
  datosUsuarios = document.querySelector("#info");

  zonaPosts = document.getElementById("posts");
  zonaFotos = document.getElementById("fotos");
  zonaAlbums = document.getElementById("albums");

  mostrarPosts = document.getElementById("mostrarPosts");
  mostrarFotos = document.getElementById("mostrarFotos");

  mostrarPosts.addEventListener("click", showPosts);
  mostrarFotos.addEventListener("click", showAlbums);

  botonera = document.querySelector("#botonera");

  await cargarUsuarios();

  cargarSelectUsuarios();
};

//Obtenemos el JSON de la dirección indicada
async function cargarUsuarios() {
  let url = "https://jsonplaceholder.typicode.com/users";
  await fetch(url)
    .then((dato) => dato.json())
    .then((datitos) => {
      usuarios = datitos;
    });
}

//Función que devuelve el sexo del usuario
async function estimarGenero(nombre) {
  partes = nombre.split(" ");
  nombre = partes[0];
  let sexo;
  let url = `https://api.genderize.io?name=${nombre}`;
  await fetch(url)
    .then((dato) => dato.json())
    .then((dato) => {
      sexo = dato.gender;
      if (sexo == "female"){
        sexo = "./img/female.png";
      } else {
        sexo = "./img/male.png";
      }
    });
    return sexo;
}
//Función que devuelve la edad del usuario
async function calcularEdad(nombre) {
  partes = nombre.split(" ");
  nombre = partes[0];
  let edad;
  let url = `https://api.agify.io/?name=${nombre}`;
  await fetch(url)
    .then((dato) => dato.json())
    .then((dato) => {
      edad = dato.age;
    });
  return edad;
}

//Cargamos el JSON de usuarios en el select
//<option value=[id del usuario]>[nombre del usuario]</option>
function cargarSelectUsuarios() {
  reiniciarParametros();
  for (let usuario of usuarios) {
    let elemento = document.createElement("option");
    elemento.innerText = usuario.name;
    elemento.value = usuario.id;
    usuariosSel.appendChild(elemento);
  }
}

//Buscamos la ciudad sugerida.
async function cargarCiudad(lat, lng) {
  let url = `https://geocode.xyz/${lat},${lng}?json=1`;
  //A COMPLETAR
}
//Filtrado de info utilizando array.filter u otro sistema
async function mostrarDatosUsuario() {
  let hola = this.value - 1;
  zonaPosts.innerHTML = "";
  zonaAlbums.innerHTML = "";
  zonaFotos.innerHTML = "";
  info.innerHTML = "";
  //A COMPLETAR

  let bordeFoto = document.createElement("div");
  bordeFoto.id = "foto";
  datosUsuarios.appendChild(bordeFoto);
  fotito = document.createElement("img");
  fotito.src = await estimarGenero(usuarios[hola].name);
  bordeFoto.appendChild(fotito);

  //Div para el innerText nombre y divNombre para añadir con datos del json
  let nombreUsuario = document.createElement("div");
  nombreUsuario.classList.add("titulo");
  nombreUsuario.innerText = "Nombre: ";
  datosUsuarios.appendChild(nombreUsuario);
  let divNombre = document.createElement("div");
  divNombre.classList.add("descripción");
  divNombre.innerText = usuarios[this.value - 1].name;
  datosUsuarios.appendChild(divNombre);

  //Div para el innerText edad y divEdad para añadir con datos del json
  let edadUsuario = document.createElement("div");
  edadUsuario.classList.add("titulo");
  edadUsuario.innerText = "Edad: ";
  datosUsuarios.appendChild(edadUsuario);
  let divEdad = document.createElement("div");
  divEdad.classList.add("descripción");
  divEdad.innerText = Math.floor((Math.random()*100)+1);
  datosUsuarios.appendChild(divEdad);

  //Div para el innerText email y divEmail para añadir con datos del json
  let emailUsuario = document.createElement("div");
  emailUsuario.classList.add("titulo");
  emailUsuario.innerText = "Email: ";
  datosUsuarios.appendChild(emailUsuario);
  let divEmail = document.createElement("div");
  divEmail.classList.add("descripción");
  let aEmail = document.createElement("a");
  aEmail.href = `${usuarios[this.value - 1].email}`;
  aEmail.innerText = `${usuarios[this.value - 1].email}`;
  divEmail.appendChild(aEmail);
  datosUsuarios.appendChild(divEmail);

  //Div para el innerText ciudad y divCiudad para añadir con datos del json
  let ciudadUsuario = document.createElement("div");
  ciudadUsuario.classList.add("titulo");
  ciudadUsuario.innerText = "Ciudad: ";
  datosUsuarios.appendChild(ciudadUsuario);
  let divCiudad = document.createElement("div");
  divCiudad.classList.add("descripción");
  divCiudad.innerText = usuarios[this.value - 1].address.city;
  datosUsuarios.appendChild(divCiudad);

  //Div para el innerText web y divWeb para añadir con datos del json
  let webUsuario = document.createElement("div");
  webUsuario.classList.add("titulo");
  webUsuario.innerText = "Web: ";
  datosUsuarios.appendChild(webUsuario);
  let divWeb = document.createElement("div");
  divWeb.classList.add("descripción");
  let aweb = document.createElement("a");
  aweb.href = `${usuarios[this.value - 1].website}`;
  aweb.innerText = `${usuarios[this.value - 1].website}`;
  divWeb.appendChild(aweb);
  datosUsuarios.appendChild(divWeb);

  botonera.classList.remove("oculto");

  //await calcularEdad(usuarios[hola].name);

  
  idUser = usuarios[this.value - 1].id;
}

//Reiniciamos los parámetros para crear elementos.
function reiniciarParametros() {
  parametros = {
    tipo: "",
    clase: "",
    id: "",
    texto: "",
    src: "",
    href: "",
    value: "",
  };
}

//Mostramos los posts en el div con id="posts"
async function showPosts() {
  zonaPosts.innerHTML = "";
  zonaAlbums.innerHTML = "";
  await getPosts(idUser);
}
async function getPosts(idUser) {
  url = `https://jsonplaceholder.typicode.com/users/${idUser}/posts`;
  await fetch(url)
    .then((dato) => dato.json())
    .then((posts) => {
      for (let post of posts) {
        let posti = document.createElement("div");
        posti.classList.add("post");
        let titular = document.createElement("div");
        titular.innerText = post.title;
        titular.classList.add("titular");
        posti.appendChild(titular);
        let cuerpo = document.createElement("div");
        cuerpo.innerText = post.body;
        cuerpo.classList.add("cuerpo");
        posti.appendChild(cuerpo);
        zonaPosts.appendChild(posti);
      }
    });
}

//Obtenemos los posts del servidor

//Mostramos los albumes en el div con id="albumes"
async function showAlbums() {
  zonaPosts.innerHTML = "";
  zonaAlbums.innerHTML = "";
  await getAlbums(idUser);
}

//Obtenemos los albumes del servidor
async function getAlbums() {
  url = `https://jsonplaceholder.typicode.com/users/${idUser}/albums`;
  await fetch(url)
  .then((dato) => dato.json())
  .then((albums) => {
    for (let album of albums){
        let anchor = document.createElement("a");
        anchor.classList.add("album");
        anchor.id = album.id;
        anchor.href = "#";
        anchor.innerText = album.title;
        zonaAlbums.appendChild(anchor);
        anchor.addEventListener("click", showFotos);
    }
  });
}

//Mostramos las fotos en el div id="fotos"
async function showFotos() {
  zonaFotos.innerHTML = "";
  console.log(this);
  await getFotos(this.id);
}

//Obtenemos las fotos del servidor
async function getFotos(idAlbum) {
  url = `https://jsonplaceholder.typicode.com/albums/${idAlbum}/photos`;
  await fetch(url).then(dato => dato.json()).then((fotos) => {
    for (let foto of fotos){
      let fotito = document.createElement("img");
      fotito.classList.add("foto");
      fotito.src = foto.thumbnailUrl;
      zonaFotos.appendChild(fotito);
    }
  });
}
