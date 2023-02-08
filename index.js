    const express = require('express');
    const expressLayouts = require('express-ejs-layouts');
    const path = require('path')
    const routes = require('./routes');
    
    const db = require('./config/db');
    db.sync().then(()=>console.log('DB Conectada')).catch((error)=>console.log(error))

    require('dotenv').config({path: 'variables.env'})

    const app = express();

    //Habilitar EJS como template engine
    app.use(expressLayouts)
    app.set('view engine', 'ejs')

    //Ubicacion Vistas
    app.set('views', path.join(__dirname, './views'));

    // archivos staticos
    app.use(express.static('public'))

    //Middleware (Usuario Logeado, Flash message, fecha Actual)
    app.use((req, res, next) => {
        const fecha = new Date();
        res.locals.year = fecha.getFullYear();
        next();
    })  

    // Routing 
    app.use('/', routes());


    //Agregar el puerto 
    app.listen(process.env.PORT, ()=>{
        console.log('Server Correct')
    })