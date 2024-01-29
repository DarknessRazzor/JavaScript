let estado;
let estados;
let datitos;
let arrayHispanos;
let numeroEstado;

window.onload = async () => {
    let areas = document.querySelectorAll("area");
    for (let area of areas){
         area.addEventListener("click", cargarDatos);
    }
}
async function cargarDatos(){
    estado = this.dataset.cod;
    
    let URL = `https://api.covidtracking.com/v1/states/${estado.toLowerCase()}/info.json`;
    await fetch(URL).then(dato => dato.json()).then(info =>{
        estados = info;
        numeroEstado = info.fips;
        cargarDatosDos(numeroEstado);
    }); 
}
async function cargarDatosDos(numeroEstado){
    let URLDos = `https://api.census.gov/data/2019/pep/charagegroups?get=POP&HISP=&for=state:${numeroEstado}`;
    await fetch(URLDos).then(datos => datos.json()).then(hispanos =>{
        arrayHispanos = hispanos;
        cargarDatosTres();
    });
}
async function cargarDatosTres(){
    let URLTres = `https://api.covidtracking.com/v1/states/${estado.toLowerCase()}/current.json`;
    await fetch(URLTres).then(datazos => datazos.json()).then(info =>{
        datitos = info; 
        cargarTabla();       
    });
}
function cargarTabla(){
    fondo.classList.remove("oculto");
    fondo.addEventListener("click", () =>{
        modal.classList.add("oculto");
        fondo.classList.add("oculto");
    });
    modal.classList.remove("oculto");

    titulo.innerText = estados.name;
    
    let poblacion = modal.querySelectorAll(".poblacion");
    poblacion[0].innerText = arrayHispanos[1][0]+"\n [100%]";
    poblacion[1].innerText = arrayHispanos[3][0]+"\n ["+calcular(arrayHispanos[1][0], arrayHispanos[3][0])+"%]";
    poblacion[2].innerText = arrayHispanos[2][0]+"\n ["+calcular(arrayHispanos[1][0], arrayHispanos[2][0])+"%]";
    notas.innerText = estados.notes;

    let descripcion = document.querySelectorAll(".descripcion");

    let numeroFecha = datitos.date;
    let cadenaFecha = numeroFecha.toString();
    let año = parseInt(cadenaFecha.slice(0, 4));
    let mes = parseInt(cadenaFecha.slice(4, 6)) - 1; 
    let dia = parseInt(cadenaFecha.slice(6, 8));

    let fecha = dia+"/"+mes+"/"+año;

    descripcion[0].innerText = fecha;
    descripcion[1].innerText = datitos.death+"\n ["+calcular(arrayHispanos[1][0], datitos.death)+"%]";
    descripcion[2].innerText = datitos.deathIncrease+"\n ["+calcular(arrayHispanos[1][0], datitos.deathIncrease)+"%]";
    descripcion[3].innerText = datitos.hospitalizedCurrently+"\n ["+calcular(arrayHispanos[1][0], datitos.hospitalizedCurrently)+"%]";
    descripcion[4].innerText = datitos.hospitalizedIncrease+"\n ["+calcular(arrayHispanos[1][0], datitos.hospitalizedIncrease)+"%]";
    descripcion[5].innerText = datitos.totalTestResults+"\n ["+calcular(arrayHispanos[1][0], datitos.totalTestResults)+"%]";
    descripcion[6].innerText = datitos.totalTestResultsIncrease+"\n ["+calcular(arrayHispanos[1][0], datitos.totalTestResultsIncrease)+"%]";
    descripcion[7].innerText = datitos.positive+"\n ["+calcular(arrayHispanos[1][0], datitos.positive)+"%]";
    descripcion[8].innerText = datitos.positiveIncrease+"\n ["+calcular(arrayHispanos[1][0], datitos.positiveIncrease)+"%]";
    descripcion[9].innerText = datitos.negative+"\n ["+calcular(arrayHispanos[1][0], datitos.negative)+"%]";
    descripcion[10].innerText = datitos.negativeIncrease+"\n ["+calcular(arrayHispanos[1][0], datitos.negativeIncrease)+"%]";
}
function calcular(uno, dos){
    let calculo = dos*100/uno;
    return calculo.toFixed(2);
}