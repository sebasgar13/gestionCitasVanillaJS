let $mensajes = document.getElementById('mensajes');
let $cardTampalte = document.getElementById('template-card').content;
let listaCitas = document.getElementById('listaPacientes');
let citas = [];

startLocalStora();

function startLocalStora(){
    if(localStorage.getItem('lista') !== undefined && localStorage.getItem('lista')){
        let listaLS = localStorage.getItem('lista');
        citas = JSON.parse(listaLS);
        console.log(citas);
        citas.map( item => addElementToList(item));
    }
}

function removeNodo(event){
    let childRe = event.target.parentNode.parentNode.parentNode;
    listaCitas.removeChild(childRe);
    let nueva = citas.filter(item => item.fecha !== childRe.querySelector('.template-fecha').textContent && item.hora !== childRe.querySelector('.template-hora').textContent)
    citas = nueva;
    nueva = null;
    childRe = null;
}
function submitForm(event){
    event.preventDefault();
    mensajes.classList.add('hidden')
    let validacionSB = [];
    for(let i = 0; i < 5; i++){
        validacionSB.push(event.target.elements[i].value);
    }
    if(validacionSB.includes('')){
        mensajes.innerText="Faltan campos por llenar"
        mensajes.classList.remove('hidden');
        validacionSB = null;
        return;
    }
    let validadorFecha = citas.find((item) => item.fecha === validacionSB[3] && item.hora === validacionSB[4])
    if(!!validadorFecha){
        mensajes.innerText="Ya hay una cita para esta fecha y hora"
        mensajes.classList.remove('hidden');
        validadorFecha= null;
        return;
    }
    validacionSB.push(event.target.elements[5].value);
    let nuevoItem = {
        nombre: validacionSB[0],
        telefono: validacionSB[1],
        correo: validacionSB[2],
        fecha: validacionSB[3],
        hora: validacionSB[4],
        nota: validacionSB[5],
    }
    addElementToList(nuevoItem); 
    citas.push(nuevoItem);
    localStorage.setItem('lista', JSON.stringify(citas));
    console.log(localStorage.getItem('lista'));
    for(let i = 0; i < 6; i++){
        event.target.elements[i].value = '';
    }
    validacionSB=null;
    nuevoItem = null;
}
function addElementToList(data){
    $cardTampalte.querySelector('.template-nombre').textContent = data.nombre;
    $cardTampalte.querySelector('.template-telefono').textContent = data.telefono;
    $cardTampalte.querySelector('.template-correo').textContent = data.correo;
    $cardTampalte.querySelector('.template-fecha').textContent = data.fecha;
    $cardTampalte.querySelector('.template-hora').textContent = data.hora;
    $cardTampalte.querySelector('.template-nota').textContent = data.nota;
    let $clonTemplate = document.importNode($cardTampalte, true);
    listaCitas.appendChild($clonTemplate);
    $clonTemplate = null;
}

