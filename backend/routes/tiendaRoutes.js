import express from 'express'
import { controller } from '../controllers/controller.js'
import { middleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/registrarse', controller.registerUser)

router.post('/login', controller.loginUser);

router.get('/usuario', middleware.authenticateToken, controller.getUser);

router.put('/usuario', middleware.authenticateToken, controller.updateUserProfile);

router.get('/productos', controller.getProducts);

export default router