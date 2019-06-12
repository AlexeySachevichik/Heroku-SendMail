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
      },
      pool: true
    });

    var sendSingleMail = function(sender, name, lead, address, subject, text){
      return new Promise((resolve, reject) => {
        transporter.sendMail(
          {
            sender: sender,
            replyTo: sender,
            from: `"${name}" <${sender}>`,
            to: address,
            subject: subject,
            text: text
          },
          (error, info) => {
            if (info) {
              resolve({
                "id": info.messageId,
                "lead": lead,
                "email": address,
                "status": 200
              });
            } else if (error) {
              reject({
                "id": '',
                "lead": lead,
                "email": address,
                "status": 500
              });
            }
          }
        );
      });
    };

    var promise_list = request.body.elist.map(item => {
      return sendSingleMail(request.body.sender, request.body.name, item.lead_id, item.address, item.subject, item.text);
    });

    Promise.all(promise_list)
      .then(results => {
        var res = JSON.stringify({"results": results});
        console.log(res);
        return response.send(res);
      })
      .catch(error => {
        console.log(error);
        return response.sendStatus(500);
      });

    transporter.close();
  });

  app.post("/test", (request, response) => {
    console.log(request.body);
    return response.sendStatus(200);
  });
};