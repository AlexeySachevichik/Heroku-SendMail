'use strict';
const config = require('./config.js');
const bodyParser = require('body-parser');
const expressClass = require('express');
const app = expressClass();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(config.port, (error) => {
	if(error) return console.log(error);
	require("./route.js")(app);
	console.log(`Start listen: http://localhost:${config.port}`);
});
