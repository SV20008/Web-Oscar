document.getElementById("btnPdf").onclick = async () => {

    const area = document.getElementById("paginaRifas");
    const canvas = await html2canvas(area, { scale: 2 });
    const img = canvas.toDataURL("image/png");

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

    pdf.addImage(img, "PNG", x, y, imgWidth, imgHeight);

    pdf.save(generarNombreArchivo("rifa-detallada"));
};