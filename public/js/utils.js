function formatearFecha(fechaISO) {
    const [anio, mes, dia] = fechaISO.split("-").map(Number);
    const fecha = new Date(anio, mes - 1, dia);

    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                    "julio", "agosto", "sept", "octubre", "nov", "dic"];

    const nombreDia = dias[fecha.getDay()];
    const nombreMes = meses[fecha.getMonth()];

    return `${nombreDia} ${dia} de ${nombreMes}, ${anio}`;
}

function formatearValor(valor) {
    const numero = parseFloat(valor);
    if (isNaN(numero)) return valor;
    return numero.toFixed(2);
}

function generarNombreArchivo(prefijo = "rifa") {
    const datos = JSON.parse(sessionStorage.getItem("rifa"));
    let articulo = datos && datos.articulo ? datos.articulo : "rifa";

    articulo = articulo
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

    return `${prefijo}-${articulo}.pdf`;
}

