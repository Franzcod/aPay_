const Mensajes = require('../models/mensajes');



const obtenerMensajes = async(req, res) => {
    
    const miId = req.uid;
    const mensajeDe = req.params.de;


    const last30 = await Mensajes.find({
        $or: [
            { de: mensajeDe, para: miId },
            { de: miId, para: mensajeDe }
        ]
    })
    .sort({ createdAt: 'desc' })
    .limit(30);

    
 
    res.json({
        ok: true,
        miId,
        mensajeDe,
        mensajes: last30
    });
}



module.exports = {
    obtenerMensajes
}