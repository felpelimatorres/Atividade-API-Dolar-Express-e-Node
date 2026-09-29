const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve os arquivos estáticos (HTML, CSS e JS) da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Rota principal: entrega o index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
