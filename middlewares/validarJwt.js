const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario.js')

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token')

    if ( !token ) {
        return res.status(401).json({
            msg: 'No tienes permiso para hacer eso'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )
        
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findOne({ _id: uid });

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Usuario no existente' 
            })
        }

        // Verificar si el uid tiene el estado en true
        if ( !usuario.state ) {
            return res.status(401).json({
                msg: 'Token no válido' 
            })
        }

        req.usuario = usuario

        next()

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Acceso no autorizado'
        })

    }



  
}


module.exports = {
    validarJWT
}




