/*
document.getElementById("formRifas").addEventListener("submit", async (e) => {

    e.preventDefault();

    document.getElementById("errorArticulo").textContent = "";
    document.getElementById("errorPromotor").textContent = "";
    document.getElementById("errorLugar").textContent = "";
    document.getElementById("errorBeneficio").textContent = "";
    document.getElementById("errorFecha").textContent = "";
    document.getElementById("errorValorNumero").textContent = "";
    document.getElementById("errorImagen").textContent = "";

    const articulo = document.getElementById("articulo").value.trim();
    const promotor = document.getElementById("inputGroupSelect01").value;
    const lugar = document.getElementById("lugar").value.trim();
    const beneficio = document.getElementById("beneficio").value.trim();
    const fecha = document.getElementById("fecha").value;
    const valorlista = document.getElementById("valorlista").value.trim();
    const valornumero = document.getElementById("valornumero").value.trim();
    const archivo = document.getElementById("imagen").files[0];

    let hayErrores = false;

    if (articulo === "") {
        document.getElementById("errorArticulo").textContent =
            "Debe ingresar el artículo.";
        hayErrores = true;
    }

    if (promotor === "......") {
        document.getElementById("errorPromotor").textContent =
            "Debe seleccionar un promotor.";
        hayErrores = true;
    }

    if (lugar === "") {
        document.getElementById("errorLugar").textContent =
            "Debe ingresar el lugar.";
        hayErrores = true;
    }

    if (beneficio === "") {
        document.getElementById("errorBeneficio").textContent =
            "Debe ingresar el beneficio.";
        hayErrores = true;
    }

    if (fecha === "") {
        document.getElementById("errorFecha").textContent =
            "Debe seleccionar una fecha.";
        hayErrores = true;
    }

    if (valorlista === "") {
        document.getElementById("errorValorNumero").textContent =
            "Debe ingresar el valor de la lista.";
        hayErrores = true;
    }

    if (valornumero === "") {
        document.getElementById("errorValorNumero").textContent =
            "Debe ingresar el valor del número.";
        hayErrores = true;
    }

    if (!archivo) {
        document.getElementById("errorImagen").textContent =
            "Debe cargar una imagen.";
        hayErrores = true;
    }

    if (hayErrores) return;

    const formData = new FormData();

    formData.append("articulo", articulo);

    formData.append(
        "promotor",
        document.getElementById("inputGroupSelect01")
            .selectedOptions[0].text
    );

    formData.append("lugar", lugar);
    formData.append("beneficio", beneficio);
    formData.append("fecha", fecha);
    formData.append("valorlista", valorlista);
    formData.append("valornumero", valornumero);
    formData.append("imagen", archivo);

    try {

        const res = await fetch("/generarRifa1", {
            method: "POST",
            body: formData
        });

        if (!res.ok) {
            throw new Error("Error al generar documento");
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

        window.URL.revokeObjectURL(url);

        const btnPdf = document.getElementById("btnPdf");

        btnPdf.classList.remove("d-none");

        document.getElementById("formRifas").reset();

        document.getElementById("articulo").focus();

    } catch (error) {

        console.error(error);

    }

});

document.getElementById("btnPdf").addEventListener("click", () => {

    window.location.href =
        "https://www.ilovepdf.com/word_to_pdf";

});

document.getElementById("articulo").focus();

*/ 

/*NUEVO CODIGO RIFAS DESCARGA PDF*/
document.getElementById("formRifas").addEventListener("submit", function (e) {
    e.preventDefault();

    const imagen = document.getElementById("imagen").files[0];
    const reader = new FileReader();

    reader.onload = function(ev){

        const datos = {
            articulo: document.getElementById("articulo").value,
            promovida: document.getElementById("inputGroupSelect01").value,
            lugar: document.getElementById("lugar").value,
            beneficio: document.getElementById("beneficio").value,
            fecha: formatearFecha(document.getElementById("fecha").value),
            valor: formatearValor(document.getElementById("valorlista").value),
            valorNumero: formatearValor(document.getElementById("valornumero").value),
            imagen: ev.target.result
        };

        sessionStorage.setItem("rifa", JSON.stringify(datos));
        location.href = "reporteRifas1.html";
    }

    reader.readAsDataURL(imagen);
});