const casos = [
{
    historia:"En el jardín de niños, la docente observa que un alumno de segundo grado, quien solía ser muy participativo, ha comenzado a presentar crisis de llanto sin explicación, se niega a entrar al baño solo y ha tenido episodios recientes de incontinencia urinaria. Al observar el recreo, nota que dos compañeros le quitan constantemente su material y se burlan cuando llora.",
    pregunta:"De acuerdo con el protocolo, ¿cuál es la acción inmediata que debe realizar la docente ante estos indicadores?",
    opciones:["Ignorar la situación por considerarla una conducta normal del desarrollo evolutivo en preescolar.
","Citar a los padres de los niños agresores para que ellos resuelvan el conflicto de manera externa.","Atender los indicadores de riesgo, salvaguardar la integridad del alumno y notificar al personal con funciones de dirección.","Sancionar a los niños involucrados sin levantar documentación para no afectar su expediente."],
    correcta:3
},
{
    historia:"Un grupo de alumnos de quinto grado reporta al director que un compañero es golpeado y pateado sistemáticamente por otro estudiante durante la salida, y que este le ha quitado y destruido varios útiles escolares (acoso físico). El director confirma que existe intención, repetición y duración en esta conducta.",
    pregunta:"¿Qué instrumentos deben elaborarse de manera conjunta entre el director y el docente para documentar legalmente este caso?
",
    opciones:["Únicamente una carta compromiso informal firmada por el alumno que ejerce el acoso.","Un reporte disciplinario estándar que no mencione la palabra "acoso"","Elaborar las Actas de Hechos para la víctima y quien ejerce la conducta, además de la Bitácora de seguimiento siendo ésta obligatoria para garantizar el debido proceso y la atención legal del caso.","No es necesario elaborar documentos si se llega a un acuerdo verbal con los padres de familia.
"],
    correcta:3
},
{
    historia:"Se detecta que un grupo de adolescentes de tercer grado de secundaria ha creado un grupo en redes sociales para difundir imágenes editadas y rumores humillantes sobre una compañera, afectando su imagen pública y aislándola del grupo (ciberacoso y acoso socioemocional).",
    pregunta:"En este caso de ciberacoso, ¿cuál es una de las medidas de no repetición y prevención que el personal directivo debe gestionar según el protocolo?
",
    opciones:["Prohibir el uso de teléfonos celulares a toda la escuela de forma permanente como única solución.","Establecer vínculos con instituciones de ciberseguridad para realizar medidas clave para prevenir y erradicar el ciberacoso con acciones de alfabetización digital y uso responsable de plataformas.","Expulsar inmediatamente a los alumnos responsables sin realizar ninguna otra acción formativa.","Sugerir a la víctima que cierre sus redes sociales para que el problema desaparezca por sí solo."],
    correcta:2
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
