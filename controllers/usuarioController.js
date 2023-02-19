const Usuarios = require('../models/Usuarios');

exports.FormCrearCuenta =  (req, res)=>{
    res.render('crear-cuenta', {
        nombrePagina : 'Crea Tu Cuenta'
    })
};

exports.crearNuevoUsuario = async (req, res) =>{
    const usuario = req.body;

    try {

        const nuevoUsuario = await Usuarios.create(usuario);
        console.log('Usuarios Creado', nuevoUsuario)
    } catch(error) {
        console.log(error)
    }



}