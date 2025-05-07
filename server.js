const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.get('/api/mesa/1234/profesor/parnotificar', (req, res) => {
  res.json({ message: 'Notificación enviada desde la API' });
});

app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});
