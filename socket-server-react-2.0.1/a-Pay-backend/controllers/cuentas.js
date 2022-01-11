
const Cuentas = require('../models/cuenta');

// ESTO DEVOLVERIA LAS DEUDAS con UNA PERSONA ("DE") 
// ( COMO LOS MENSAJES DE CHAT con UNA PERSONA  )
//  NO TODAS LAS CUENTAS QUE TENGO !!!!


// const obtenerCuentas = async (req, res) => {
    
//     const miId = req.uid;
//     const cuentasCon = req.params.de;


//     const cuentas = await Cuentas.find({ 
//         $or: [
//             { deudor: cuentasCon, prestamista: miId },
//             { deudor: miId, prestamista: cuentasCon }
//         ]
//     })


 
//     res.json({
//         ok: true,
//         miId,
//         cuentasCon,
//         cuentas

//     });
// }

const obtenerCuentas = async (req, res) => {
    
    const miId = req.uid;
    const cuentasCon = req.params.de;


    const cuentas = await Cuentas.find()

    
 
    res.json({
        ok: true,
        miId,
        cuentasCon,
        cuentas

    });
}



module.exports = {
    obtenerCuentas
}



// FIJARSE SI ESTA BIEN EL "DE" ...