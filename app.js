const express = require('express');
var app = express();
var port =  3000;
var bodyParser = require('body-parser');
const say = require('say')
const path = require('path');


app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/public/index.html'));
   // say.speak("","",0.8 );
});



app.listen(port);