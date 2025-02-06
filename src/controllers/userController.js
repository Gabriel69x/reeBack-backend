
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try {
        const { nombre, email, password, role } = req.body;

        // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'El usuario ya existe' });

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario nuevo
        user = new User({ nombre, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado correctamente', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};