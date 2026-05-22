const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MODELO
const VideojuegoSchema = new mongoose.Schema({
  titulo: String,
  sinopsis: String,
  anio: Number,
  cover: String
});

const Videojuego = mongoose.model('Videojuego', VideojuegoSchema);

// ======================
// GET TODOS
// ======================
app.get('/videojuegos', async (req, res) => {
  const juegos = await Videojuego.find();
  res.json(juegos);
});

// ======================
// GET POR ID (ESTO TE FALTABA)
// ======================
app.get('/videojuegos/:id', async (req, res) => {
  try {
    const juego = await Videojuego.findById(req.params.id);

    if (!juego) {
      return res.status(404).json({ message: 'No encontrado' });
    }

    res.json(juego);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// POST
// ======================
app.post('/videojuegos', async (req, res) => {
  console.log('BODY RECIBIDO:', req.body);

  const juego = new Videojuego(req.body);
  await juego.save();

  res.json(juego);
});

// ======================
// PUT
// ======================
app.put('/videojuegos/:id', async (req, res) => {
  await Videojuego.findByIdAndUpdate(req.params.id, req.body);
  res.json({ mensaje: 'Actualizado' });
});

// ======================
// DELETE
// ======================
app.delete('/videojuegos/:id', async (req, res) => {
  await Videojuego.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Eliminado' });
});

// ======================
// CONEXIÓN + SERVER
// ======================
mongoose.connect('mongodb://alex98_db:Al98ex98@ac-3lufrom-shard-00-00.sgcgidu.mongodb.net:27017,ac-3lufrom-shard-00-01.sgcgidu.mongodb.net:27017,ac-3lufrom-shard-00-02.sgcgidu.mongodb.net:27017/?ssl=true&replicaSet=atlas-11oglt-shard-0&authSource=admin&appName=Cluster98')
  .then(() => {
    console.log('✅ MongoDB conectado');

    app.listen(3000, () => {
      console.log('🚀 Servidor corriendo en puerto 3000');
    });

  })
  .catch((err) => {
    console.log('❌ Error MongoDB:', err);
  });