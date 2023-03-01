

const dbValidators = require('./dbValidators.js')
const generarJWT = require('./generarJWT.js')
const googleVerify = require('./google-verify.js')
const subirArchivo = require('./subirArchivo.js')


module.exports = {
    ...dbValidators, 
    ...generarJWT, 
    ...googleVerify, 
    ...subirArchivo

}