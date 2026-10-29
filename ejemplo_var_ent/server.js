require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Permite leer datos enviados por React

const puerto = process.env.PORT || 3000;
const codigoSecreto = process.env.SECRET_CODE;

app.get('/api/status', (req, res) => {
  res.json({ mensaje: "Conexión exitosa al servidor" });
});

app.post('/api/verify', (req, res) => {
  const intento = req.body.password; 
  if (intento === codigoSecreto) {
    res.json({ success: true, mensaje: "¡Acceso concedido! Contraseña correcta." });
  } else {
    res.status(401).json({ success: false, mensaje: "Acceso denegado. Intenta de nuevo." });
  }
});

app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
