const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
      
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        // "" si el usuario está activo
        if ( !usuario.state ) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - estado: false'
            })
        } 
        //"" la contraseña
        const validarPass = bcryptjs.compareSync( password, usuario.password )
        if( !validarPass ) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - password'
            })
        } 
        //Generar el JWT
        const token = await generarJWT( usuario.id )

        res.json({
            usuario,
            token    
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}



module.exports = {
    login
}