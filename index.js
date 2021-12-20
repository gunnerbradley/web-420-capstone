// /*
// ============================================
// ; Title:  index.js
// ; Author: Gunner Bradley
// ; Date:   18 November 2021
// ; Description: Main server file for the assignments in WEB 420 RESTful APIs capstone project
// ;===========================================
// */

require('dotenv').config()
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const shipAPI = require('./routes/ship-routes');

const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD



let app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({'extended': true}));

/**
 * MongoDB Atlas connection string
 */
const conn = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.mlnw2.mongodb.net/420-capstone?retryWrites=true&w=majority`;

mongoose.connect(conn, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
})

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // files containing annotations for the OpenAPI Specification
};

const openapiSpecification = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api", shipAPI);

app.get('/', (req,res) => {
  // on root the the user will be redirected to /api-docs website
  res.redirect('https://bradley-capstone-420.herokuapp.com/api-docs');
});

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Application started and listening on port ${app.get('port')}`);
})
