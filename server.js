// Imports
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;

// Initiate server
const server = express();

// Body Parser configuration

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

// Configure routes
server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Shop List</title>
    </head>
    <body>
        <h1>API Shop List</h1>
        <ul>
            <li>/api/users/register/ use for register your user 
                body must contains : email, password, username
            </li>
        </ul>
    </body>
    </html>`);
})

server.use('/api/', apiRouter);
// Launch server
server.listen(3000, function() {
    console.log("Server is launch on http://localhost:3000")
})
