const datos = JSON.parse(sessionStorage.getItem("invitacion"));
const contenedor = document.getElementById("paginaInvitacion");

contenedor.innerHTML = `
<div class="invitacion-pagina">

    <div class="marca-agua"></div>

    <div class="invitacion-header">
        <img src="img/Ciudad-de-Sion.jpg" class="logo-invitacion" alt="Iglesia">
        <div class="titulo-invitacion">
            <h2>Iglesia Profética La Ciudad de Sion</h2>
            <h3>${datos.iglesia}</h3>
        </div>
        <img src="img/ELsalvador.jpg" class="logo-invitacion" alt="Gobierno">
    </div>

    <hr class="linea-header">

    <div class="invitacion-checks">
        <p><span class="check">○</span> <i><b>Hermano Pastor,</b></i></p>
        <p><span class="check">○</span> <i><b>Congregación Presente:</b></i></p>
    </div>

    <div class="invitacion-cuerpo">
        <p>
            Por este medio tenemos el agrado de saludarles en el nombre de nuestro
            señor Jesucristo, y a la vez invitarles a un poderoso culto unido de la
        </p>
        <p class="destacado">"${datos.tipoCulto}"</p>
        <p>Que estaremos celebrando para la gloria de Dios.</p>
        <p><b>Día:</b> ${datos.fecha}</p>
        <p><b>Hora:</b> ${datos.hora}</p>
        <p><b>Lugar:</b> ${datos.lugar}</p>
        <p>Esperamos contar con su presencia, "desde ya les damos la bienvenida".</p>
    </div>

    <div class="invitacion-versiculo">
        <p><i>Alabad a Jehová, porque él es bueno, porque para siempre es su misericordia.</i></p>
        <p><i>Salmos 136:1</i></p>
    </div>

    <div class="invitacion-firmas">
        <div class="firma">
            <span class="linea-firma">F.</span>
            <p><b>Pastor:</b> ${datos.nombrePastor}</p>
        </div>
        <div class="firma">
            <span class="linea-firma">F.</span>
            <p><b>President@:</b> ${datos.nombrePresidente}</p>
        </div>
    </div>

</div>
`;