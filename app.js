const express = require('express');
var app = express();
var port =  3000 || process.env.PORT;
var bodyParser = require('body-parser');
const say = require('say')
const path = require('path');

app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.static(path.join(__dirname,'public')));

app.listen(port);