const config = require('./config.js');
const nodemailer = require('nodemailer');

module.exports = function(app){

	app.get("/", (request, response) => {
		var d = new Date;
		return response.send(`[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}] Start listen http://localhost:${config.port}`);
	});
	
	app.post("/", (request, response) => {

		const email = {
			sender: request.body.sender,
			name: request.body.name,
	    address: request.body.address,
	    subject: request.body.subject,
	    text: request.body.text
		};

		async function main(){

		  let transporter = nodemailer.createTransport({
		    host: "smtp.gmail.com",
		    port: 587,
		    secure: false, // true for 465, false for other ports
		    auth: {
		      user: config.user,
		      pass: config.pass
		    }
		  });

		  let info = await transporter.sendMail({
		  	sender: email.sender,
		  	replyTo: email.sender,
		    from: `"${email.name}" <${email.sender}>`,
		    to: email.address,
		    subject: email.subject,
		    text: email.text
		  });

		  console.log("Message sent: %s", info.messageId);
		}

		main().catch(console.error);
		return response.sendStatus(200);
	});
};