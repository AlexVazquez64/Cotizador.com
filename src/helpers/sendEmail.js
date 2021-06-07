"use strict";
const nodemailer = require("nodemailer");

exports.sendEmail = async ( cliente, file ) => {
  console.log('entro a sendEmail')

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'outlook',
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'correo@outlook.com', // generated ethereal user
      pass: 'password', // generated ethereal password
    },
  });

  var mailOptions = {
    from: '"RCI" <correo@outlook.com>',
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
