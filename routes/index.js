const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const usuarioController = require('../controllers/usuarioController')

module.exports = function(){
    router.get('/', homeController.home);
    router.get('/crear-cuenta', usuarioController.FormCrearCuenta);
    return router
}