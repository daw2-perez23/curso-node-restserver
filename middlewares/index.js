

const validaCampos      = require('../middlewares/validarCampos.js')
const validaJWT         = require('../middlewares/validarJwt.js')
const validaRoles       = require('../middlewares/validarRoles.js')
const validaArchivos    = require('../middlewares/validarArchivo')



module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validaArchivos
}
