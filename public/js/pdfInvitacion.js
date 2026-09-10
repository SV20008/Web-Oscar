// Esperamos a que reporteInvitacion.js ya haya inyectado el contenido
let instanciaPanzoom = null;

function inicializarZoom() {
    const elemento = document.getElementById("paginaInvitacion");

    instanciaPanzoom = panzoom(elemento, {
        maxZoom: 3,
        minZoom: 0.3,
        bounds: true,
        boundsPadding: 0.2,
        zoomDoubleClickSpeed: 1
    });

    const visor = document.getElementById("visorInvitacion");
    const escalaInicial = visor.clientWidth / elemento.scrollWidth;
    instanciaPanzoom.zoomAbs(0, 0, Math.min(1, escalaInicial * 0.95));
}

document.getElementById("btnZoomIn")?.addEventListener("click", () => {
    instanciaPanzoom.smoothZoom(0, 0, 1.3);
});

document.getElementById("btnZoomOut")?.addEventListener("click", () => {
    instanciaPanzoom.smoothZoom(0, 0, 0.7);
});

document.getElementById("btnZoomReset")?.addEventListener("click", () => {
    instanciaPanzoom.moveTo(0, 0);
    instanciaPanzoom.zoomAbs(0, 0, 1);
});

setTimeout(inicializarZoom, 50);

document.getElementById("btnPdfInvitacion").onclick = async () => {

    const boton = document.getElementById("btnPdfInvitacion");
    boton.disabled = true;
    boton.textContent = "Generando PDF...";

    try {
        const area = document.querySelector(".invitacion-pagina");

        // Reseteamos el zoom antes de capturar
        const transformPrevio = instanciaPanzoom.getTransform();
        instanciaPanzoom.zoomAbs(0, 0, 1);
        instanciaPanzoom.moveTo(0, 0);

        await new Promise(resolve => setTimeout(resolve, 100));

        // Fix de márgenes: forzamos un ancho de ventana fijo para que
        // PC y celular capturen exactamente igual
        const canvas = await html2canvas(area, {
            scale: 2,
            windowWidth: 1000,
            scrollX: 0,
            scrollY: 0
        });

        const img = canvas.toDataURL("image/jpeg", 0.9);

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "letter");

        const pageWidth = 216;
        const pageHeight = 279;
        const margin = 10;
        const maxWidth = pageWidth - margin * 2;
        const maxHeight = pageHeight - margin * 2;

        let imgWidth = maxWidth;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight > maxHeight) {
            imgHeight = maxHeight;
            imgWidth = (canvas.width * imgHeight) / canvas.height;
        }

        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;

        pdf.addImage(img, "JPEG", x, y, imgWidth, imgHeight);
        pdf.save("invitacion.pdf");

        // Restauramos el zoom que el usuario tenía antes de descargar
        instanciaPanzoom.zoomAbs(0, 0, transformPrevio.scale);
        instanciaPanzoom.moveTo(transformPrevio.x, transformPrevio.y);

    } finally {
        boton.disabled = false;
        boton.textContent = "Descargar PDF";
    }
};