const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connection, router } = require('./models/db'); // Asegúrate de que esté correctamente importado

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router); // Asegúrate de que estás usando el prefijo '/api' si es parte de tus rutas en db.js

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
