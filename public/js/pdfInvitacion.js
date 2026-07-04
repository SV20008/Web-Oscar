document.getElementById("btnPdfInvitacion").onclick = async () => {

    const boton = document.getElementById("btnPdfInvitacion");
    boton.disabled = true;
    boton.textContent = "Generando PDF...";

    try {
        const area = document.querySelector(".invitacion-pagina");

        const canvas = await html2canvas(area, { scale: 2 });
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

    } finally {
        boton.disabled = false;
        boton.textContent = "Descargar PDF";
    }
};