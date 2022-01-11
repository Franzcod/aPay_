
const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {
    
    try {

        const {nombre, email, password} = req.body;

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail) {
            console.log('[ x ]'.bgRed.black,' Correo ya registrado '.red)
           return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
           });
        }

        const usuario = new Usuario({nombre, email, password});

        // TODO: Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar en la base de datos
        await usuario.save();


        // Generar JWT
        const token = await generarJWT(usuario.id);   

        res.json({
            ok: true, 
            msg: 'Usuario creado', 
            usuario, 
            token
        });

        console.log('[ ok ]'.bgGreen.black, ` Usuario '${ usuario.nombre }' creado exitosamente` .blue);
    
    } catch (error) {
        console.log(error.red);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }
};


const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB) {
            console.log('[ x ]'.bgRed.black,' Correo no encontrado en Base de datos '.red)
            return res.status(400).json({
                ok: false,
                msg: 'El correo no esta registrado'
            });
        }

        // Validar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            console.log('[ x ]'.bgRed.black,' Password incorrecto '.red)
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: 'Login correcto',
            usuario: usuarioDB,
            token
        });
        console.log('[ ok ]'.bgGreen.black, ` Usuario '${ usuarioDB.nombre }' logueado exitosamente` .blue);

        
    } catch (error) {
        console.log(error.red);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }
        
}


const renewToken = async (req, res = response) => {

    const uid = req.uid;


    // Generar un nuevo token
    const token = await generarJWT(uid);


    // Obtener el usuario para obtener los datos
    const usuario = await Usuario.findById(uid);


    res.json({
        ok: true,
        usuario,
        token
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
};