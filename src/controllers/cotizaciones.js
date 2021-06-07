const { response } = require( 'express' );
const fs = require('fs');

const { createPDF } = require('../helpers/pdf');
const { sendEmail } = require('../helpers/sendEmail');

const { db } = require( '../models/index' );

const Cotizaciones = db.cotizaciones;
const Detalles = db.detalles;
const Clientes =  db.clientes;
// const Op = db.Sequelize.Op;

let tempFile;

exports.openCotizacionPDF = async( req, res = response ) => {

  try {

    const { id } = res.req.params;

    const cotizacion = await Cotizaciones.findByPk( id );

    const data_cotizacion = cotizacion.dataValues;

    const cliente = await Clientes.findByPk( data_cotizacion.cliente_id  );

    const data_cliente = cliente.dataValues;

    const detalles = await Detalles.findAll({
      where: {
        cotizacion_id: id
      }
    });

    tempFile = await createPDF( data_cliente, data_cotizacion, detalles );

    // This line opens the file as a readable stream
    var readStream = fs.createReadStream( tempFile );

    // This will wait until we know the readable stream is actually valid before piping
    readStream.on( 'open', function () {
      // This just pipes the read stream to the response object (which goes to the client)
      readStream.pipe( res );
    });

    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on( 'error', function( err ) {
      res.end( err );
    });

  } catch ( error ) {
    console.log( error )
  }
}

exports.sendCotizacionPDF = async( req, res = response ) => {

  try {

    const { id } = res.req.params;

    const cotizacion = await Cotizaciones.findByPk( id );

    const data_cotizacion = cotizacion.dataValues;

    const cliente = await Clientes.findByPk( data_cotizacion.cliente_id );

    const data_cliente = cliente.dataValues;

    const detalles = await Detalles.findAll({
      where: {
        cotizacion_id: id
      }
    });

    tempFile = await createPDF( data_cliente, data_cotizacion, detalles );

    // This line opens the file as a readable stream
    var readStream = fs.createReadStream(tempFile);

    // This will wait until we know the readable stream is actually valid before piping
    readStream.on( 'open', function () {
      // This just pipes the read stream to the response object (which goes to the client)
      readStream.pipe( res );
    });

    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on( 'error', function( err ) {
      res.end( err );
    });

    await sendEmail(data_cliente, tempFile);

  } catch ( error ) {
    console.log( error )
  }
}

// Create and Save a new Cotizaciones
exports.create = async( req, res = response ) => {

  // Create a Cliente
  const data_cotizacion = {
    folio,
    cliente_id,
    descripcion,
    fecha_validez,

  } = req.body;

  try {

    cotizacion = new Cotizaciones( req.body );

    // Save User in the database
    await Cotizaciones.create( data_cotizacion );

    res.status( 200 ).json({
      ok: true,
      cotizacion: {
        data_cotizacion
      },
      message: 'Se ha creado la Cotizacion exitosamente!'
    });

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
};

// Retrieve all Users from the database.
exports.findAll = async( req, res = response ) => {
  
  try {
    
    const respuesta = await Cotizaciones.findAll();

    res.status( 200 ).json({
      ok: true,
      cotizacion: {
        values: respuesta
      }
      
    });
  } catch ( error ) {
    res.status( 500 ).json({
      ok: false,
      message:
        error.message || "Algún error ocurrió al momento de traer las Cotizaciones."
    });
  }

};

// Find a single User with an id
exports.findOne = async( req, res = response ) => {
  const id = req.params.id;

  try {

    const respuesta = await Cotizaciones.findByPk(
      id,
    );

    res.status( 200 ).json({
      ok: true,
      cotizacion: {
        respuesta
      }
    })

  } catch ( error ) {
    res.status( 500 ).send({
      ok: false,
      message: "Error retrieving Cotizaciones with id=" + id,
      error
    });
  }
};

// Update a User by the id in the request
exports.update = async( req, res = response ) => {
  const id = req.params.id;

  try {
    const respuesta = await Cotizaciones.update( req.body, {
      where: { id: id }
    })
    if ( respuesta == 1 ) {
      res.send({
        ok: true,
        message: "La cotización fue actualizada correctamente!"
      });
    } else {
      res.send({
        ok: false,
        message: `No se puede actualizar la cotización con el id =${id}. Puede que la cotización no exista!`
      });
    }
  } catch ( error ) {
    res.status( 500 ).send({
      message: "Error al actualizar la cotización con el id = " + id,
      error
    });
  }
};

// Delete a User with the specified id in the request
exports.delete = async( req, res = response ) => {

  const id = req.params.id;

  try {

    const respuesta = await Cotizaciones.destroy({
      where: { id: id }
    });

    if ( respuesta === 1 ) {
      res.send({
        ok: true,
        message: "La cotización se ha borrado exitosamente!"
      });
      fs.unlinkSync( id + '.pdf' )
    } else {
      res.send({
        ok: false,
        message: `No se pudo borrar la cotización con el id = ${ id }. Puede que no se encuentre!`
      });
    }

  } catch ( error ) {
    res.status( 500 ).send({
      message: "Error al eliminar la cotización con el id = " + id,
      error
    });
  }
};

// Delete all User from the database.
exports.deleteAll = ( req, res ) => {
  
};

// Find all published User
exports.findAllPublished = ( req, res ) => {
  
};