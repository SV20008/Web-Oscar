document.getElementById("btnPdf").onclick = async () => {

    const area = document.getElementById("paginaRifas");

    const canvas = await html2canvas(area, {
        scale: 2
    });

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

    const nombreArchivo = generarNombreArchivo();

    pdf.save(nombreArchivo);
};

function generarNombreArchivo() {
    const datos = JSON.parse(sessionStorage.getItem("rifa"));

    let articulo = datos && datos.articulo ? datos.articulo : "rifa";

    // Limpia el texto: quita acentos, caracteres especiales, y reemplaza espacios por guiones
    articulo = articulo
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita acentos
        .replace(/[^a-zA-Z0-9\s-]/g, "") // quita caracteres especiales
        .trim()
        .replace(/\s+/g, "-"); // espacios por guiones

    return `rifa-${articulo}.pdf`;
}