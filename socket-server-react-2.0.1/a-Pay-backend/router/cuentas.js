/**
 * PAth: /api/cuentas
 */


const {Router}           = require('express');
const { obtenerCuentas } = require('../controllers/cuentas');
const { validarJWT }     = require('../middlewares/validar-jwt');


const router =  Router();

// router.get('/:de', validarJWT, obtenerCuentas);
router.get('/:de', obtenerCuentas);


module.exports = router;