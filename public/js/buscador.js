// Buscar mientras escribe en el menú lateral
document.addEventListener("DOMContentLoaded", () => {

    const buscador = document.getElementById("searchInput");

    if (buscador) {

        buscador.addEventListener("input", () => {

            const texto = buscador.value.toLowerCase().trim();
            const items = document.querySelectorAll(".nav-item");
            const mensaje = document.getElementById("sinResultados");

            let encontrados = 0;

            items.forEach(item => {

                const contenido = item.textContent.toLowerCase();
                item.classList.remove("resultado-encontrado");

                if (contenido.includes(texto)) {
                    item.style.display = "";
                    if (texto !== "") {
                        item.classList.add("resultado-encontrado");
                    }
                    encontrados++;
                } else {
                    item.style.display = "none";
                }

            });

            if (encontrados === 0 && texto !== "") {
                mensaje.textContent = "Sin resultados";
            } else {
                mensaje.textContent = "";
            }

        });
    }

});