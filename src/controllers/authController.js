
const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
        const { nombre, email, role } = req.body;
        const newUser = new User({ nombre, email, role });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    }
};
const getProfile = async (req, res) => {
    try {
        res.json({
            _id: "679c28b0abc6240d22e9d23a",
            nombre: "Gabriel Cortes",
            email: "gabriel@example.com",
            role: "admin"
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener perfil", error: error.message });
    }
};
module.exports = { registerUser, getProfile };

