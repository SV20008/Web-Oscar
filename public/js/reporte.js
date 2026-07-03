const datos = JSON.parse(sessionStorage.getItem("rifa"));

const contenedor = document.getElementById("paginaRifas");

let html = `<table class="tabla-rifas" width="100%" cellspacing="0">`;

for (let i = 0; i < 4; i++) {
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
                Dicha rifa es promovida por la ${d.promovida} de la Iglesia Profética la Ciudad de Sion<br>
                A beneficio de ${d.beneficio}<br>
                Valor de la lista: $${d.valor}
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
            <td colspan="2" class="fila-campos">
                <div class="campo">
                    <span>Nombre:</span>
                    <span class="linea"></span>
                </div>
                <div class="campo">
                    <span>Teléfono:</span>
                    <span class="linea"></span>
                </div>
            </td>
        </tr>
    </table>
    `;
}