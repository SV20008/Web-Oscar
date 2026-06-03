document.getElementById("formRifas").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
        "articulo",
        document.getElementById("articulo").value
    );

    formData.append(
        "promotor",
        document.getElementById("inputGroupSelect01").selectedOptions[0].text
    );

    formData.append(
        "valor",
        document.getElementById("valorlista").value
    );

    formData.append(
        "fecha",
        document.getElementById("fecha").value
    );

    const archivo = document.getElementById("imagen").files[0];

    if (archivo) {
        formData.append("imagen", archivo);
    }

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

        const a = document.createElement("a");
        a.href = url;
        a.download = "rifa.docx";
        document.body.appendChild(a);
        a.click();
        a.remove();

    } catch (error) {
        console.error(error);
    }
});