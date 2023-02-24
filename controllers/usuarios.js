const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario.js')



const usuariosGet = (req = request , res = response) => {
    
    const { q, nombre = 'NULL', apikey, page = 1, limit} =  req.query

    res.json({
        "msg": "get API - Controlador",
        q, 
        nombre, 
        apikey,
        page,
        limit
    })
}

const usuariosPost = async(req, res = response) => {

    const { name, email, password, rol } = req.body
    const usuario = new Usuario({ name, email, password, rol })

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync( password, salt )
    //Guarda en DB
    await usuario.save()

    res.json({
        usuario
    })
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id

    res.json({
        "msg": "put API - Controlador",
        id
    })
} 

const usuariosDelete = (req, res = response) => {
    res.json({
        "msg": "delete API - Controlador"
    })
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete

}