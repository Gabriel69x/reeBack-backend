const express = require('express');
const dotenv = require('dotenv'); 
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');


const authRoutes = require('./routers/authRoutes');
const productRoutes = require('./routers/productRoutes');
const orderRoutes = require('./routers/orderRoutes');
const userRoutes = require('./routers/userRoutes');


dotenv.config();
connectDB();


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//registro de rutas 
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

//comprobando si ruta raiz funcional
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🔵 Servidor corriendo en el puerto ${PORT}`);
});
