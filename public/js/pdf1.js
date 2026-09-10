let instanciaPanzoomRifas1 = null;

function inicializarZoomRifas() {
    const elemento = document.getElementById("paginaRifas");

    instanciaPanzoomRifas1 = panzoom(elemento, {
        maxZoom: 3,
        minZoom: 0.2,
        bounds: true,
        boundsPadding: 0.2,
        zoomDoubleClickSpeed: 1
    });

    const visor = document.getElementById("visorRifas");
    const escalaInicial = visor.clientWidth / elemento.scrollWidth;
    instanciaPanzoomRifas1.zoomAbs(0, 0, Math.min(1, escalaInicial * 0.95));
}

document.getElementById("btnZoomIn")?.addEventListener("click", () => {
    instanciaPanzoomRifas1.smoothZoom(0, 0, 1.3);
});

document.getElementById("btnZoomOut")?.addEventListener("click", () => {
    instanciaPanzoomRifas1.smoothZoom(0, 0, 0.7);
});

document.getElementById("btnZoomReset")?.addEventListener("click", () => {
    instanciaPanzoomRifas1.moveTo(0, 0);
    instanciaPanzoomRifas1.zoomAbs(0, 0, 1);
});

setTimeout(inicializarZoomRifas, 50);

document.getElementById("btnPdf").onclick = async () => {

    const boton = document.getElementById("btnPdf");
    boton.disabled = true;
    boton.textContent = "Generando PDF...";

    try {
        const area = document.getElementById("paginaRifas");

        const transformPrevio = instanciaPanzoomRifas1.getTransform();
        instanciaPanzoomRifas1.zoomAbs(0, 0, 1);
        instanciaPanzoomRifas1.moveTo(0, 0);

        await new Promise(resolve => setTimeout(resolve, 100));

        const canvas = await html2canvas(area, { scale: 2 });
        const img = canvas.toDataURL("image/jpeg", 0.85);

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "letter");

        const pageWidth = 216;
        const pageHeight = 279;
        const margin = 12;
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
        pdf.save(generarNombreArchivo());

        instanciaPanzoomRifas1.zoomAbs(0, 0, transformPrevio.scale);
        instanciaPanzoomRifas1.moveTo(transformPrevio.x, transformPrevio.y);

    } finally {
        boton.disabled = false;
        boton.textContent = "Descargar PDF";
    }
};