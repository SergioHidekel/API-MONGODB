const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos,validarJWT,esAdminRole,tieneRole} = require('../middlewares');

const{usuariosGet, usuariosPut,usuariosPost,usuariosDelete,usuariosPatch } = require('../controllers/usuarios')
const{esRolValido, emailExiste,existeUsuarioPorId} = require('../helpers/db-validators');

const router= Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste),
    check('password', 'La contraseña debe tener mas de 6 caracteres').isLength({min: 6}),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;