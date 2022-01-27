const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol='' ) =>  {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El rol ${rol} no está resgitrado en la BD`)
    }
}

const emailExiste = async ( correo = '') =>{
    //Verificar si el correo existe 
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
        throw new Error(`El correo: ${correo} ya se encuntra registrado`)
    }
}

const existeUsuarioPorId = async ( id ) =>{
    //Verificar si el correo existe 
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario){
        throw new Error(`El usuario con ID: ${id} no existe`)
    }
}


module.exports= {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}