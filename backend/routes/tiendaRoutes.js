import express from 'express'
import { controller } from '../controllers/controller.js'
import { adminController } from '../controllers/adminController.js'
import { reservasController } from '../controllers/reservasController.js'
import { middleware } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = express.Router()

//usuario

router.post('/registrarse', controller.registerUser)

router.post('/login', controller.loginUser);

router.get('/usuario', middleware.authenticateToken, controller.getUser);

router.put('/usuario', middleware.authenticateToken, controller.updateUserProfile);

router.get('/productos', controller.getProducts);

router.get('/productos/categoria/:categoria', controller.getProductsByCategory);

router.put('/usuario/password', middleware.authenticateToken, controller.updatePassword);

router.post('/reservas', middleware.authenticateToken, reservasController.crearReserva);

router.put('/update-reserva/:id', middleware.authenticateToken, reservasController.actualizarReservaUsuario);

router.delete('/delete-reserva/:id', middleware.authenticateToken, reservasController.eliminarReserva);

//admin

router.post('/admin-add-product', upload.single('imagen'), adminController.addProduct);

router.put('/admin-edit-product/:id', upload.single('imagen'), adminController.editProduct);

router.delete('/admin-delete-product/:id', adminController.deleteProduct);

router.post('/admin/send-email', adminController.sendEmail);

router.post('/admin/verify-email', adminController.verifyAndSendEmail);

router.get('/admin/reservas', middleware.authenticateToken, reservasController.obtenerReservas);

router.put('/admin/update-reservas/:id', middleware.authenticateToken, reservasController.actualizarReservaAdmin )

router.delete('/admin/delete-reserva/:id', middleware.authenticateToken, reservasController.eliminarReserva)

export default router