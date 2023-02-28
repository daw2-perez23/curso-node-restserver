const { Router } = require('express')
const { check } = require('express-validator')

//*
// const { validarCampos } = require('../middlewares/validarCampos.js')
// const { validarJWT } = require('../middlewares/validarJwt.js')
// const { esAdminRole, tieneRole } = require('../middlewares/validarRoles.js')
//*

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares')

const { esRoleValido, esEmailValido, existeUsuarioPorId } = require('../helpers/dbValidators.js')

const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete } = require('../controllers/usuarios')

const router = Router()


router.get('/', usuariosGet )

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
] ,usuariosPut )

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña ha de tener más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    // check('role', 'No es un rol válido').isIn([ 'ADMIN_ROLE' , 'USER_ROLE' ]),
    check('rol').custom( esRoleValido ),
    check('email').custom( esEmailValido ),
    validarCampos
], usuariosPost )

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,usuariosDelete )




module.exports = router