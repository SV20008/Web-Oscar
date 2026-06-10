document.getElementById("formRifas").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Limpiar errores anteriores
    document.getElementById("errorArticulo").textContent = "";
    document.getElementById("errorPromotor").textContent = "";
    document.getElementById("errorValor").textContent = "";
    document.getElementById("errorFecha").textContent = "";
    document.getElementById("errorImagen").textContent = "";

    const articulo = document.getElementById("articulo").value.trim();
    const promotor = document.getElementById("inputGroupSelect01").value;
    const valor = document.getElementById("valorlista").value.trim();
    const fecha = document.getElementById("fecha").value;
    const archivo = document.getElementById("imagen").files[0];

    let hayErrores = false;

    // Validar artículo
    if (articulo === "") {
        document.getElementById("errorArticulo").textContent =
            "Debe ingresar el artículo a rifar.";
        hayErrores = true;
    }

    // Validar promotor
    if (promotor === "......") {
        document.getElementById("errorPromotor").textContent =
            "Debe seleccionar quién promueve la rifa.";
        hayErrores = true;
    }

    // Validar valor
    if (valor === "") {
        document.getElementById("errorValor").textContent =
            "Debe ingresar el valor de la lista.";
        hayErrores = true;
    } else if (!Number.isInteger(Number(valor))) {
        document.getElementById("errorValor").textContent =
            "Solo se permiten números enteros.";
        hayErrores = true;
    }

    // Validar fecha
    if (fecha === "") {
        document.getElementById("errorFecha").textContent =
            "Debe seleccionar una fecha.";
        hayErrores = true;
    }

    // Validar imagen
    if (!archivo) {
        document.getElementById("errorImagen").textContent =
            "Debe cargar una imagen.";
        hayErrores = true;
    } else {
        const extensionesPermitidas = [
            "image/jpeg",
            "image/png"
        ];

        if (!extensionesPermitidas.includes(archivo.type)) {
            document.getElementById("errorImagen").textContent =
                "Solo se permiten imágenes JPG, JPEG o PNG.";
            hayErrores = true;
        }
    }

    if (hayErrores) {
        return;
    }

    const formData = new FormData();

    formData.append("articulo", articulo);

    formData.append(
        "promotor",
        document.getElementById("inputGroupSelect01").selectedOptions[0].text
    );

    formData.append("valor", valor);

    formData.append("fecha", fecha);

    formData.append("imagen", archivo);

    try {
        const res = await fetch("/generar", {
            method: "POST",
            body: formData
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Error del servidor:", errorText);
            return;
        }

        const blob = await res.blob();

        const url = window.URL.createObjectURL(blob);

        const nombreArchivo = articulo
            .replace(/[\\/:*?"<>|]/g, "")
            .trim();

        const a = document.createElement("a");
        a.href = url;
        a.download = `Rifa-${nombreArchivo}.docx`;

        document.body.appendChild(a);
        a.click();
        a.remove();

        //funcionalidad del nuevo boton convertir a pdf
        const btnPdf = document.getElementById("btnPdf");
        btnPdf.classList.remove("d-none");
        btnPdf.classList.add("btn-pdf-activo");

        window.URL.revokeObjectURL(url);

        // Limpiar formulario
        document.getElementById("formRifas").reset();

        // Volver al primer campo
        document.getElementById("articulo").focus();

        // Mostrar modal
        setTimeout(() => {
            const modal = new bootstrap.Modal(
                document.getElementById("pdfModal")
            );

            modal.show();
        }, 8000);

    } catch (error) {
        console.error(error);
    }
});

/* document.getElementById("convertPdfBtn").addEventListener("click", () => {
    window.location.href = "https://www.ilovepdf.com/word_to_pdf";
}); */

window.addEventListener("load", () => {
    document.getElementById("articulo").focus();
});


document.getElementById("btnPdf").addEventListener("click", () => {
    window.location.href = "https://www.ilovepdf.com/word_to_pdf";
});

