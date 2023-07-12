const express = require('express');
const next = require('next');
const path = require('path');
// const bodyParser = require('body-parser')

const dev = false;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();

app.enable('view cache');

// app.use(bodyParser.json())

app.all('*', (req, res) => {
    return handle(req, res);
});


module.exports = app;