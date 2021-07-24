"use strict";
const { response } = require("express");
const nodemailer = require("nodemailer");

exports.sendEmail = async ( cliente, file ) => {
  console.log('entro a sendEmail')

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'mail5015.site4now.net',
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'cotizacion@redcontraincendio.com', // generated ethereal user
      pass: 'cotizacion1#', // generated ethereal password
    },
  });

  var mailOptions = {
    from: '"RCI" <cotizacion@redcontraincendio.com>',
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
      response.send({
        error: true
      })
    } else {
      response.send({
        error: false,
        msg: 'Se ha enviado correctamente'
      })
      console.log('Email sent: ' + info.response);
    }
  });

}
