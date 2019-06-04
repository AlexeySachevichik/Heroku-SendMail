'use strict';
const bodyParser = require('body-parser');
const expressClass = require('express');
const app = expressClass();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, (error) => {
	if(error) return console.log(error);
	require("./route.js")(app);
	var d = new Date;
	console.log(`[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}] Start listen http://localhost:${PORT}`);
});
