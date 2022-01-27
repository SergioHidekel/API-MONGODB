const {response, request}=require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {   
    const {limite = 5, desde = 0} = req.query;
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {
    const {nombre, correo, password, rol}  = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //Guardar en DB
    await usuario.save();
    res.status(201).json({
        usuario
    });
}

const usuariosPut = async(req, res = response) => {
    const {id} =  req.params;
    const {_id, password, google, correo, ...resto} = req.body;
    //TODO: VALIDAR CONTRA BASE
    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt); 
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.status(500).json(
        usuario
    );
}

const usuariosDelete = async (req, res = response) => {
    const{id} = req.params;
    //const usuario = await Usuario.findOneAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json({
        usuario,
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}