const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJwt');
const { googleVerify } = require('../helpers/google-verify');

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


const googleSignIn = async( req, res = response ) => {

    const { id_token } = req.body

    try {

        const { name, img, email } = await googleVerify( id_token )
        
        let usuario = await Usuario.findOne({ email })

        if( !usuario ){
            // Creación del usuario
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true,
                rol: 'USER_ROLE'
            }

            console.log(data);

            usuario = new Usuario( data )
            await usuario.save()
        }

        if ( !usuario.state ){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
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
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar - Google'
        })
    }

}


module.exports = {
    login,
    googleSignIn
}