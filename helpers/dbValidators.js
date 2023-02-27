const Role = require('../models/role.js') 
const Usuario = require('../models/usuario.js')

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no es válido`)
    }
}

const esEmailValido = async( email = '' ) => {

    const existeEmail = await Usuario.findOne({ email })
    if( existeEmail ){
        throw new Error(`El email ${email} ya existe`)
    }
}

const existeUsuarioPorId = async( id ) => {

    const existeUsuario = await Usuario.findById(id)
    if( !existeUsuario ){
        throw new Error(`El id ${id} no existe`)
    }
}



module.exports = {
    esRoleValido,
    esEmailValido,
    existeUsuarioPorId
}



