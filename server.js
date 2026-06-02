const express = require('express');

const app = express();

// Permite leer JSON si luego envías datos desde el frontend
app.use(express.json());

// Sirve tus archivos HTML, CSS, JS (Bootstrap incluido)
app.use(express.static('.'));

// Ruta de prueba (API)
app.get('/api/test', (req, res) => {
    res.json({ mensaje: "Backend funcionando" });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});