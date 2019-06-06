const nodemailer = require('nodemailer');

module.exports = function(app){

  app.get("/", (request, response) => {
    var d = new Date;
    return response.send(`[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}] Server start.`);
  });
  
  app.post("/send", (request, response) => {

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: request.body.user,
        pass: request.body.pass
      }
    });

    transporter.sendMail({
      sender: request.body.sender,
      replyTo: request.body.sender,
      from: `"${request.body.name}" <${request.body.sender}>`,
      to: request.body.address,
      subject: request.body.subject,
      html: request.body.text
    },
    (error, info) => {
      if (info) {
        console.log(`Message sent: ${info.messageId}`);
        return response.sendStatus(200);
      }
      else if (error) {
        console.log('Message does not sent');
        console.log(error);
        return response.sendStatus(500);
      }
    });
  });
};