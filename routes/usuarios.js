const { Router } = require('express')
const { check } = require('express-validator')


const { validarCampos } = require('../middlewares/validarCampos.js')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete,  } = require('../controllers/usuarios')
const { esRoleValido, esEmailValido } = require('../helpers/dbValidators.js')

const router = Router()


router.get('/', usuariosGet )

router.put('/:id', usuariosPut )

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña ha de tener más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    // check('role', 'No es un rol válido').isIn([ 'ADMIN_ROLE' , 'USER_ROLE' ]),
    check('rol').custom( esRoleValido ),
    check('email').custom( esEmailValido ),
    validarCampos
], usuariosPost )

router.delete('/', usuariosDelete )




module.exports = router