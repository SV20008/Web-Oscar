document.getElementById("btnGenerarInvitacion").addEventListener("click", function () {

    const datos = {
        tipoCulto: document.getElementById("tipoCulto").value,
        iglesia: document.getElementById("iglesia").value,
        fecha: formatearFechaInvitacion(document.getElementById("fechaInvitacion").value),
        hora: formatearHora(document.getElementById("horaInvitacion").value),
        lugar: document.getElementById("lugarInvitacion").value,
        nombrePastor: document.getElementById("nombrePastor").value,
        nombrePresidente: document.getElementById("nombrePresidente").value
    };

    sessionStorage.setItem("invitacion", JSON.stringify(datos));
    location.href = "reporteInvitacion.html";
});

function formatearFechaInvitacion(fechaISO) {
    const [anio, mes, dia] = fechaISO.split("-").map(Number);
    const fecha = new Date(anio, mes - 1, dia);

    const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    return `${dias[fecha.getDay()]} ${dia} de ${meses[fecha.getMonth()]} de ${anio}`;
}

function formatearHora(horaISO) {
    const [h, m] = horaISO.split(":").map(Number);
    const periodo = h >= 12 ? "PM" : "AM";
    const hora12 = h % 12 === 0 ? 12 : h % 12;
    return `${hora12}:${m.toString().padStart(2, "0")} ${periodo}`;
}