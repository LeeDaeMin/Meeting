const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nombre: Sequelize.STRING(60),
    imagen: Sequelize.STRING(60),
    email: {    
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            isEmail: { msg: 'Agrega un Correo Valido'}
        },
        unique: {
            args: true,
            msg: 'Usuario Ya Registado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El Password NO Puede Ir Vacio'
            }
        }
    },
    activo: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },

    tokenPassword: Sequelize.STRING,
    expitaToken : Sequelize.DATE

}, {
    hooks: {
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10),
            null);
        }
    }
});

//Metodo para comparar los contraseñas 
Usuarios.prototype.validaPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = Usuarios