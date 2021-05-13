const { response } = require( 'express' );
const { db } = require( '../models/index' );

const Detalles = db.detalles;
const Op = db.Sequelize.Op;

// Create and Save a new Detalle
exports.create = async( req, res = response ) => {

  // Create a Detalle
  const data_detalle = {
    cotizacion_id,
    articulo_id,
    cantidad,
    importe,

  } = req.body;

  try {
    // let detalle = await Detalles.findOne({
    //   where: {
    //     email
    //   }
    // });

    // if ( detalle ) {
    //   return res.status( 400 ).json({
    //     ok: false,
    //     message: 'Ya existe un Detalle con ese correo!',
    //   });
    // }

    Detalle = new Detalles( req.body );

    // Save Detalle in the database
    await Detalles.create( data_detalle );

    res.status( 200 ).json({
      ok: true,
      Detalle: {
        data_detalle
      },
      message: 'El Detalle se ha creado exitosamente!'
    });

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
};

// Retrieve all Detalle from the database.
exports.findAll = async(req, res = response) => {
  
  try {
    
    const respuesta = await Detalles.findAll();

    res.status( 200 ).json({
      ok: true,
      Detalles: {
        values: respuesta
      }
      
    });
  } catch ( error ) {
    res.status( 500 ).json({
      ok: false,
      message:
        error.message || "Algún error ocurrió al momento de traer los Detalles."
    });
  }

};

// Find a single Detalle with an id
exports.findOne = async( req, res = response ) => {
  const id = req.params.id;

  try {

    const respuesta = await Detalles.findByPk( id );

    res.status( 200 ).json({
      ok: true,
      Detalle: respuesta
    })

  } catch ( error ) {
    res.status( 500 ).send({
      ok: false,
      message: "Error al traer al Detalle con el id = " + id,
      error
    });
  }
};

// Update a Detalle by the id in the request
exports.update = async( req, res = response ) => {
  const id = req.params.id;

  try {
    const respuesta = await Detalles.update( req.body, {
      where: { id: id }
    })
    if ( respuesta == 1 ) {
      res.send({
        ok: true,
        message: "El Detalle fue actualizado correctamente!."
      });
    } else {
      res.send({
        ok: false,
        message: `No se puede actualizar el Detalle con el id = ${id}. Puede que el Detalle no exista!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al actualizar el Detalle con el id = " + id,
      error
    });
  }
};

// Delete a Detalle with the specified id in the request
exports.delete = async( req, res ) => {

  const id = req.params.id;

  try {

    const respuesta = await Detalles.destroy({
      where: { id: id }
    });
    
    if ( respuesta == 1 ) {
      res.send({
        ok: true,
        message: "El Detalle fue borrado exitosamente!"
      });
    } else {
      res.send({
        ok: false,
        message: `No se pudo borrar el Detalle con el id = ${id}. Puede que el Detalle no se encuentre!`
      });
    }

  } catch ( error ) {
    res.status(500).send({
      message: "Error al eliminar el Detalle con el id = " + id,
      error
    });
  }
};