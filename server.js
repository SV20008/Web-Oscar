const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Archivos estáticos
app.use(express.static("public"));
app.use(express.static("."));

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});