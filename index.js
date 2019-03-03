'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

// Config
var server_config = require('./config/server');

var app = express();

app.use(cors());

var server = require('http').Server(app);

let port_number = server_config.port || 1212;
app.set('port', port_number);
server.listen(port_number);

console.log("Great, server started and listening at port " + port_number);
