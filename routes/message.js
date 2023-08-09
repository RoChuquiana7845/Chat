import express from "express";
import controller from "../controllers/message.js";

const router = express.Router();

//Definimos los rutas de la aplicación

router.post('/save', controller.save);
router.get('/messages', controller.getMessages);

export default router;
