const { response } = require( 'express' );
const { db } = require( '../models/index' );

const Cotizaciones = db.cotizaciones;
// const Op = db.Sequelize.Op;

// Create and Save a new Cotizaciones
exports.create = async(req, res = response) => {

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

    console.log( respuesta )

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

    const respuesta = await Cotizaciones.findByPk({
      where: {
        //your where conditions, or without them if you need ANY entry
      },
      order: [ [ 'createdAt', 'DESC' ]]
    });

    // const { nombre, email } = respuesta;

    console.log( respuesta )
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
exports.delete = async( req, res ) => {

  const id = req.params.id;

  try {

    const respuesta = await Cotizaciones.destroy({
      where: { id: id }
    });
    
    if ( respuesta == 1 ) {
      res.send({
        ok: true,
        message: "La cotización se ha borrado exitosamente!"
      });
    } else {
      res.send({
        ok: false,
        message: `No se pudo borrar la cotización con el id = ${id}. Puede que no se encuentre!`
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