"use strict";
const nodemailer = require("nodemailer");

exports.sendEmail = async ( cliente, file ) => {
  console.log('entro a sendEmail')

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'mail.redcontraincendio.com',
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'cotizacion@redcontraincendio.com', // generated ethereal user
      pass: 'cotizacion1#', // generated ethereal password
    },
  });

  var mailOptions = {
    from: '"RCI" <alejandrovazquezc@outlook.com>',
    to: `${cliente.email}`,
    subject: 'Cotización de RCI',
    text: `Hola ${cliente.nombre}, te envío la cotización, seguimos en contacto, saludos.`,

    attachments: [{
      filename: file,
      path: process.cwd() + '/' + file,
      contentType: 'application/pdf'
    }],
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}
