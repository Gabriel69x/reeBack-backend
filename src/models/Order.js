const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    usuario: String,
    productos: Array,
    total: Number,
    estado: { type: String, enum: ['pendiente', 'procesado', 'enviado', 'entregado'], default: 'pendiente' }
});
module.exports = mongoose.model('Order', orderSchema);