const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(" Conexión exitosa a MongoDB Atlas"))
.catch(err => console.error(" Error de conexión:", err));

// Esquema NoSQL de Mongoose (Documento JSON)
const AnimalSchema = new mongoose.Schema({
 nombre: String,
 especie: String,
 edad: Number
});
const Animal = mongoose.model('Animal', AnimalSchema);

// RUTAS DE LA API
// 1. GET: Obtener todos los productos
app.get('/animales', async (req, res) => {
 const animales = await Animal.find();
 res.json(animales);
});

// 2. POST: Insertar un nuevo producto
app.post('/animales', async (req, res) => {
 const nuevoAnimal = new Animal(req.body);
 await nuevoAnimal.save();
 res.json({
   mensaje: "Animal registrado",
   nuevoAnimal
 });
});


// EDITAR
app.put('/animales/:id', async (req, res) => {

    const animalesActualizado =
    await Animal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
    );

    res.json(animalesActualizado);

});

// ELIMINAR
app.delete('/animales/:id', async (req, res) => {

    await Animal.findByIdAndDelete(
        req.params.id
    );

    res.json({
        mensaje:"Animal eliminado"
    });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));