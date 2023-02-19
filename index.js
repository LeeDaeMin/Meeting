    const express = require('express');
    const expressLayouts = require('express-ejs-layouts');
    const path = require('path');
    const flash = require('connect-flash');
    const session = require('express-session');
    const cookieParser = require('cookie-parser');
    const routes = require('./routes');
    
    // Configuracion y Modelos BD
    const db = require('./config/db');
        require('./models/Usuarios');
        db.sync().then(()=>console.log('DB Conectada')).catch((error)=>console.log(error))


    // Variables de Desarrollo 
    require('dotenv').config({path: 'variables.env'})

    // Aplicacion Principal
    const app = express();

    //Body Parser, leer formulario 
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))

    //Habilitar EJS como template engine
    app.use(expressLayouts)
    app.set('view engine', 'ejs')

    //Ubicacion Vistas
    app.set('views', path.join(__dirname, './views'));

    // archivos staticos
    app.use(express.static('public'))

    // Habilitar cookie parser
    app.use(cookieParser());

    //crear la session
    app.use(session({
        secret: process.env.SECRETO,
        key: process.env.KEY,
        resave: false,
        saveUninitialized: false
    }))

    // Agregar Falsh Message
    app.use(flash());

    //Middleware (Usuario Logeado, Flash message, fecha Actual)
    app.use((req, res, next) => {
        res.locals.mensajes = req.flash();
        const fecha = new Date();
        res.locals.year = fecha.getFullYear();
        next();
    });

    // Routing 
    app.use('/', routes());


    //Agregar el puerto 
    app.listen(process.env.PORT, ()=>{
        console.log('Server Correct')
    })