const casos = [
{
    historia:"Juan ve que un compañero sufre bullying en clase.",
    pregunta:"¿Qué debería hacer Juan?",
    opciones:["Ignorarlo","Apoyar y reportar","Reírse","Grabarlo"],
    correcta:1
},
{
    historia:"Ana encuentra basura en el parque.",
    pregunta:"¿Qué acción es correcta?",
    opciones:["Ignorar","Recogerla","Patearla","Tomar foto"],
    correcta:1
},
{
    historia:"Luis tiene un conflicto con un amigo.",
    pregunta:"¿Qué debe hacer?",
    opciones:["Gritar","Hablar y resolver","Ignorar","Pelear"],
    correcta:1
}
];

let nivel = 0;
let seleccion = null;

// Cargar caso
function cargarCaso(){
    const caso = casos[nivel];

    document.getElementById("historia").innerText = caso.historia;
    document.getElementById("pregunta").innerText = caso.pregunta;

    let opcionesHTML = "";
    caso.opciones.forEach((op,i)=>{
        opcionesHTML += `<div class="opcion" onclick="seleccionar(${i},this)">${op}</div>`;
    });

    document.getElementById("opciones").innerHTML = opcionesHTML;
    document.getElementById("mensaje").innerHTML = "";

    // 👇 CONTROL DE BOTONES
    document.getElementById("btnNext").style.display="none";
    document.getElementById("btnRetry").style.display="none";

    seleccion = null;

    actualizarProgreso();
}

// Selección
function seleccionar(i,el){
    document.querySelectorAll(".opcion").forEach(o=>o.classList.remove("selected"));
    el.classList.add("selected");
    seleccion = i;
}

// Verificar
function verificar(){
    if(seleccion===null) return;

    const correcto = casos[nivel].correcta;
    const opciones = document.querySelectorAll(".opcion");

    // Reset estilos
    opciones.forEach(o=>o.classList.remove("correcta","incorrecta"));

    if(seleccion===correcto){

        opciones[seleccion].classList.add("correcta");

        document.getElementById("mensaje").innerText="✔ Correcto";
        document.getElementById("mensaje").style.color="green";

        // 👇 SOLO SIGUIENTE
        document.getElementById("btnNext").style.display="inline-block";
        document.getElementById("btnRetry").style.display="none";

        document.getElementById("p"+(nivel+1)).classList.add("completo");

    }else{

        opciones[seleccion].classList.add("incorrecta");

        document.getElementById("mensaje").innerText="❌ Incorrecto, intenta de nuevo";
        document.getElementById("mensaje").style.color="red";

        // 👇 SOLO REINTENTAR
        document.getElementById("btnRetry").style.display="inline-block";
        document.getElementById("btnNext").style.display="none";
    }
}

// Reintentar
function reiniciarIntento(){
    cargarCaso();
}

// Siguiente
function siguienteCaso(){
    nivel++;
    if(nivel<casos.length){
        cargarCaso();
    }else{
        document.querySelector(".card").innerHTML=
        "<h2 style='text-align:center;color:green;'>🎉 Has completado todos los casos</h2>";
    }
}

// Progreso
function actualizarProgreso(){
    document.querySelectorAll(".paso").forEach(p=>p.classList.remove("activo"));
    document.getElementById("p"+(nivel+1)).classList.add("activo");
}

// Inicializar
cargarCaso();