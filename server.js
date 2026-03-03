import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();

// Carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});