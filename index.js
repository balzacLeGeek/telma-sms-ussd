'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

// Config
var server_config = require('./config/server');

// API Routes
var ussd_api = require('./routes/ussd');

var app = express();

app.use(cors());
app.use('/api/ussd', ussd_api);

var server = require('http').Server(app);

let port_number = server_config.port || 1212;
app.set('port', port_number);
server.listen(port_number);

console.log("Great, server started and listening at http://localhost:" + port_number);
