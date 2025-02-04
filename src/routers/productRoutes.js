
const express = require('express');
const {createProduct, getAllProducts, getProductById, updateProduct,deleteProduct} = require('../controllers/productController');
const router = express.Router();

router.post('/add', createProduct);
router.get('/list', getAllProducts);
router.get('/:id', getProductById);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;