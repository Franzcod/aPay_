/**
 * PAth: /api/mensajes
 */


 const {Router}           = require('express');
const { obtenerMensajes } = require('../controllers/mensajes');
 const { validarJWT }     = require('../middlewares/validar-jwt');
 
 
 const router =  Router();
 
 router.get('/:de', validarJWT, obtenerMensajes);
 
 
 module.exports = router;