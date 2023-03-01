const { Router } = require('express');
const { check } = require('express-validator');
const { 
    crearCategoria, 
    obtenerCategorias,
    obtenerCategoria, 
    actualizarCategoria, 
    borrarCategoria} = require('../controllers/categorias.js');
const { existeCategoriaPorId } = require('../helpers/dbValidators.js');

const { validarCampos } = require('../middlewares/validarCampos.js');
const { validarJWT } = require('../middlewares/validarJwt.js');
const { esAdminRole } = require('../middlewares/validarRoles.js');

const router = Router();


/** 
 * {{url}}/api/categorias
*/

// Obtener todas las categorias - público
router.get('/', obtenerCategorias) ;

// Obtener una categoria por id - público
router.get('/:id', [    
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
    check('id').custom( existeCategoriaPorId )
], obtenerCategoria)

// Crear categoria - privado - token válido
router.post('/', [ 
    validarJWT ,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria )

// Actualizar un registro por id - privado - token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
] ,actualizarCategoria)

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
] ,borrarCategoria)


module.exports = router