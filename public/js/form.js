/* 
document.getElementById("formRifas").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Limpiar errores anteriores
    document.getElementById("errorArticulo").textContent = "";
    document.getElementById("errorPromotor").textContent = "";
    document.getElementById("errorBeneficio").textContent = "";
    document.getElementById("errorValor").textContent = "";
    document.getElementById("errorFecha").textContent = "";
    document.getElementById("errorImagen").textContent = "";

    const articulo = document.getElementById("articulo").value.trim();
    const promotor = document.getElementById("inputGroupSelect01").value;
    const beneficio = document.getElementById("beneficio").value.trim();
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

    //Validad beneficio
    if (beneficio === "") {
        document.getElementById("errorBeneficio").textContent =
            "Debe ingresar el beneficio de la rifa.";
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

    //enviar datos al servidor
    formData.append("valor", valor);

    formData.append("beneficio", beneficio);

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



window.addEventListener("load", () => {
    document.getElementById("articulo").focus();
});




*/
// Tooltip para límite de caracteres
const beneficio = document.getElementById("beneficio");
const tooltip = document.getElementById("tooltipBeneficio");

if (beneficio && tooltip) {

    beneficio.addEventListener("input", () => {

        if (beneficio.value.length === 18) {

            tooltip.style.display = "block";

            setTimeout(() => {
                tooltip.style.display = "none";
            }, 3000);

        }

    });
}



/*NUEVO FORM PARA RIFA CLASICO DESCARGA PDF*/
document.getElementById("btnGenerar").addEventListener("click", function () {

    const imagen = document.getElementById("imagen").files[0];
    const reader = new FileReader();

    reader.onload = function(e){

        const datos = {
            articulo: document.getElementById("articulo").value,
            promovida: document.getElementById("inputGroupSelect01").value,
            beneficio: document.getElementById("beneficio").value,
            fecha: formatearFecha(document.getElementById("fecha").value),
            valor: formatearValor(document.getElementById("valorlista").value),
            imagen: e.target.result
        };

        sessionStorage.setItem("rifa", JSON.stringify(datos));

        limpiarFormulario();

        location.href = "reporteRifas.html";
    }

    reader.readAsDataURL(imagen);
});

function limpiarFormulario() {
    document.getElementById("articulo").value = "";
    document.getElementById("inputGroupSelect01").selectedIndex = 0;
    document.getElementById("beneficio").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("valorlista").value = "";
    document.getElementById("imagen").value = "";
}

// Focus automático en el primer campo al cargar la página
window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("articulo").focus();
});