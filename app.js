const express = require('express');
const next = require('next');
const path = require('path');

const dev = false;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();

app.enable('view cache');

app.all('*', (req, res) => {
    return handle(req, res);
});


module.exports = app;