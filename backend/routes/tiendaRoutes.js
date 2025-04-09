import express from 'express'
import { controller } from '../controllers/controller.js'
import { adminController } from '../controllers/adminController.js'
import { middleware } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.post('/registrarse', controller.registerUser)

router.post('/login', controller.loginUser);

router.get('/usuario', middleware.authenticateToken, controller.getUser);

router.put('/usuario', middleware.authenticateToken, controller.updateUserProfile);

router.get('/productos', controller.getProducts);

router.get('/productos/categoria/:categoria', controller.getProductsByCategory);

router.put('/usuario/password', middleware.authenticateToken, controller.updatePassword);

//admin

router.post('/admin-add-product', upload.single('imagen'), adminController.addProduct);

router.put('/admin-edit-product/:id', upload.single('imagen'), adminController.editProduct);

router.delete('/admin-delete-product/:id', adminController.deleteProduct);

export default router