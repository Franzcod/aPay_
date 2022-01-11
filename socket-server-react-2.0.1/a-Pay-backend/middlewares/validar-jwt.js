const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const userToken = req.header('x-token');


    if(!userToken) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const {uid} = jwt.verify(userToken, process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}