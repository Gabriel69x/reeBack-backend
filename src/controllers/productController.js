
const  Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Producto agregado correctamente', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar producto', error: error.message });
    }
};
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
};
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: 'Producto actualizado correctamente', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};

module.exports = {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct};
