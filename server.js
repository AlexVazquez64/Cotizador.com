const express = require('express');
const bodyParser = require('body-parser');
// const dbConnection = require('./database/config');
const cors = require('cors');
const { db } = require('./src/models/index');

// create express app
const app = express();

app.use(cors());

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

// // drop the table if it already exists

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// define a root route
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to 'Cotizador' application." });
  
});

// Routes
// using as middleware
header('Access-Control-Allow-Origin: *');
app.use( '/api/clientes', require( './src/routes/cliente.routes' ) );

app.use( '/api/articulos', require( './src/routes/articulo.routes' ) );

app.use( '/api/cotizaciones', require( './src/routes/cotizacion.routes' ) )

app.use( '/api/detalles', require( './src/routes/detalles.routes' ) )

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


// createPDF();