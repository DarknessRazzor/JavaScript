let datos;
window.onload = () => {
  recogerDatos();
};
function recogerDatos() {
  let URLDatos = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/provincias-espanolas/records?limit=52";
  fetch(URLDatos).then((datos) => datos.json()).then(dato => {
    console.log(dato);
      datos = dato.results;
      cargarProvincias();
    });
}
function cargarProvincias() {
  let lista = document.querySelectorAll(".comunidad div");
  for (let comunidad of lista) {
    if (comunidad.querySelector("a")) {
      comunidad.querySelector("a").addEventListener("click", cargarEvento);
    }
  }
}
function cargarEvento() {
  informacion.innerHTML = "";
  let comunidad = decodeURI(this.parentNode.dataset.id);
  let tabla = document.createElement("table");
  let fila = document.createElement("tr");

  informacion.appendChild(tabla);

  fila.innerText = comunidad;

  for (let provincias of datos) {
    if (provincias.ccaa == comunidad) {
      let columna = document.createElement("td");
      columna.appendChild(document.createTextNode(provincias.provincia));
        columna.addEventListener("click", () =>{
            cargarMinimapa(provincias.geo_point_2d);
        });
      tabla.appendChild(columna);
    }
  }
}
function cargarMinimapa(coordenadas){
    let urlMinimapa = "https://www.openstreetmap.org/#map=14/"+coordenadas.lat+"/"+coordenadas.lon;
    window.open(urlMinimapa);
}