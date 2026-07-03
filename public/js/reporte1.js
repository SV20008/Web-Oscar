const datos = JSON.parse(sessionStorage.getItem("rifa"));
const contenedor = document.getElementById("paginaRifas");

let html = `<table class="tabla-rifas" width="100%" cellspacing="0">`;

for (let i = 0; i < 3; i++) {   // antes era 4, ahora 3 filas → 3 x 2 = 6 rifas
    html += "<tr>";
    for (let j = 0; j < 2; j++) {
        html += `<td>${crearRifa(datos)}</td>`;
    }
    html += "</tr>";
}

html += "</table>";
contenedor.innerHTML = html;

function crearRifa(d) {
    return `
    <table width="100%" class="tabla-interna">
        <tr>
            <td colspan="2" align="center">
                <b class="titulo-boleto">¡¡Gran rifa de ${d.articulo}!!</b>
            </td>
        </tr>
        <tr>
            <td width="75%" class="texto-descripcion">
                Dicha rifa es promovida por la ${d.promovida} de la Iglesia Profética la Ciudad de Sion ${d.lugar} a beneficio de ${d.beneficio}.
            </td>
            <td class="col-imagen" align="center">
                <img src="${d.imagen}" width="90">
            </td>
        </tr>
        <tr>
            <td colspan="2" class="fecha-completa">
                Fecha a realizar: ${d.fecha}
            </td>
        </tr>
        <tr>
            <td colspan="2" class="fecha-completa">
                Valor de la lista: $${d.valor}
            </td>
        </tr>
        <tr>
            <td colspan="2" class="fecha-completa">
                Valor del número: $${d.valorNumero}
            </td>
        </tr>
        <tr>
            <td colspan="2" class="fila-numeros">
                <div class="linea-numerada">1.<span class="linea"></span></div>
                <div class="linea-numerada">2.<span class="linea"></span></div>
                <div class="linea-numerada">3.<span class="linea"></span></div>
                <div class="linea-numerada">4.<span class="linea"></span></div>
            </td>
        </tr>
        <tr>
            <td colspan="2" class="fila-campos">
                <div class="campo">
                    <span>Vendida por:</span>
                    <span class="linea"></span>
                </div>
            </td>
        </tr>
    </table>
    `;
}