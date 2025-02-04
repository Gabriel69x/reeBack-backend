const Order = require('../models/Order');

// Crear una orden
const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: 'Orden creada correctamente', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la orden', error: error.message });
    }
};

// Obtener todas las órdenes
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener órdenes', error: error.message });
    }
};

// Obtener una orden por ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Orden no encontrada" });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la orden', error: error.message });
    }
};

// Actualizar una orden
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: "Orden no encontrada" });
        res.json({ message: 'Orden actualizada correctamente', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la orden', error: error.message });
    }
};

// Eliminar una orden
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: "Orden no encontrada" });
        res.json({ message: 'Orden eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la orden', error: error.message });
    }
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };
