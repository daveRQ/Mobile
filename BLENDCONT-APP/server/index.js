const express = require('express')
const bodyParser = require('body-parser')
//const mongoose = require('mongoose')
const app = express()

//Settings
app.set('port', process.env.PORT || 3000);
const PORT = 3000;

// aAdd all documents
app.use(bodyParser.json())

//Rutas
app.use('/api/authRoutes', require('./routes/authRoutes'));
app.use('/api/restaurante', require('./routes/restauranteRoutes'));
app.use('/api/duenio', require('./routes/duenioRoutes'));
app.use('/api/inventario', require('./routes/inventarioRoutes'));
app.use('/api/platillo', require('./routes/platilloRoutes'));
app.use('/api/diaOperacional', require('./routes/diaOperacionalRoutes'));
app.use('/api/informes', require('./routes/informesRoutes'));

//cargar mongoose desde el archivo database.js
const { mongoose } = require('./database');


// const localhost = '192.168.0.112'
// app.listen(PORT, localhost, () => {
//     console.log("server running " + app.get('port'))
// })
app.listen(PORT, () => {
    console.log("server running " + PORT)
})
