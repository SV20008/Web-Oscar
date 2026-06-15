const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const ImageModule = require("docxtemplater-image-module-free");

const app = express();

const upload = multer({
    dest: "uploads/"
});

// Middleware
app.use(express.json());

// Archivos estáticos
app.use(express.static("public"));
app.use(express.static("."));

app.post("/generar", upload.single("imagen"), (req, res) => {

    console.log("ENTRO A /generar");
    console.log("DATOS RECIBIDOS:");
    console.log(req.body);

    console.log("ARCHIVO RECIBIDO:");
    console.log(req.file);

    const {
        articulo,
        promotor,
        beneficio,
        valor,
        fecha
    } = req.body;

    try {

        // =========================
        // FORMATEAR VALOR
        // =========================
        const valorFormateado =
            valor && valor !== ""
                ? Number(valor).toFixed(2)
                : "";

        // =========================
        // FORMATEAR FECHA
        // =========================
        let fechaFormateada = "";

        if (fecha) {

            const [anio, mes, dia] = fecha.split("-");

            const fechaObj =
                new Date(Number(anio), Number(mes) - 1, Number(dia));

            const diasSemana = [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado"
            ];

            const nombreDia =
                diasSemana[fechaObj.getDay()];

            fechaFormateada =
                `${nombreDia} ${dia}/${mes}/${anio}`;
        }

        // =========================
        // LEER PLANTILLA
        // =========================
        const rutaPlantilla =
            path.resolve("plantilla2.docx");

        console.log("RUTA:");
        console.log(rutaPlantilla);

        console.log("EXISTE:");
        console.log(fs.existsSync(rutaPlantilla));

        const content =
            fs.readFileSync(rutaPlantilla, "binary");

        // =========================
        // MÓDULO DE IMÁGENES
        // =========================
        const imageModule = new ImageModule({

            getImage: function (tagValue) {
                return fs.readFileSync(tagValue);
            },

            getSize: function () {
                return [60, 60];
            }
        });

        // =========================
        // DOCXTEMPLATER
        // =========================
        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            modules: [imageModule],
            paragraphLoop: true,
            linebreaks: true
        });

        // =========================
        // RUTA DE LA IMAGEN
        // =========================
        let rutaImagen = "";

        if (req.file) {
            rutaImagen =
                path.resolve(req.file.path);
        }

        console.log("Imagen:");
        console.log(rutaImagen);

        // =========================
        // REEMPLAZAR VARIABLES
        // =========================
        doc.render({
            articulo,
            promotor,
            beneficio,
            valor: valorFormateado,
            fecha: fechaFormateada,
            imagen: rutaImagen
        });

        // =========================
        // GENERAR WORD
        // =========================
        const buffer =
            doc.getZip().generate({
                type: "nodebuffer"
            });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=rifa.docx"
        );

        res.send(buffer);

    } catch (error) {

        console.log("ERROR COMPLETO:");

        if (
            error.properties &&
            error.properties.errors
        ) {

            error.properties.errors.forEach((e, i) => {

                console.log(`Error ${i + 1}:`);
                console.log(e);

            });

        } else {

            console.log(error);

        }

        res.status(500).send(error.message);
    }
});

//FOMRULARIO RIFAS 1
app.post("/generarRifa1", upload.single("imagen"), (req, res) => {

    const {
        articulo,
        promotor,
        lugar,
        beneficio,
        fecha,
        valorlista,
        valornumero
    } = req.body;

    try {

        const valorListaFormateado =
            Number(valorlista).toFixed(2);

        const valorNumeroFormateado =
            Number(valornumero).toFixed(2);

        let fechaFormateada = "";

        if (fecha) {

            const [anio, mes, dia] = fecha.split("-");

            const fechaObj =
                new Date(Number(anio), Number(mes) - 1, Number(dia));

            const diasSemana = [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado"
            ];

            const nombreDia =
                diasSemana[fechaObj.getDay()];

            fechaFormateada =
                `${nombreDia} ${dia}/${mes}/${anio}`;
        }

        const rutaPlantilla =
            path.resolve("plantilla3.docx");

        const content =
            fs.readFileSync(rutaPlantilla, "binary");

        const imageModule = new ImageModule({

            getImage: function (tagValue) {
                return fs.readFileSync(tagValue);
            },

            getSize: function () {
                return [60, 60];
            }

        });

        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            modules: [imageModule],
            paragraphLoop: true,
            linebreaks: true
        });

        let rutaImagen = "";

        if (req.file) {
            rutaImagen = path.resolve(req.file.path);
        }

        doc.render({

            articulo,
            promotor,
            lugar,
            beneficio,
            fecha: fechaFormateada,
            valorlista: valorListaFormateado,
            valornumero: valorNumeroFormateado,
            imagen: rutaImagen

        });

        const buffer = doc.getZip().generate({
            type: "nodebuffer"
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=rifa.docx"
        );

        res.send(buffer);

    } catch (error) {

        console.log(error);

        res.status(500).send(error.message);

    }

});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});