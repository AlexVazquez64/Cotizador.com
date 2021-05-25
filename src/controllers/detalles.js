const { response } = require( 'express' );

const { db } = require( '../models/index' );
const { createPDF } = require('../helpers/pdf');



const Detalles = db.detalles;
const Cotizaciones = db.cotizaciones;
const Clientes = db.clientes;
const Articulos = db.articulos;
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

    console.log('Detalle del req.body')
    console.log(Detalle)

    // Save Detalle in the database
    const detalleResp = await Detalles.create( data_detalle );

    console.log(detalleResp)

    const data_cotizacion = await Cotizaciones.findOne(
      {
        id: data_detalle.cotizacion_id,
        where: {
          //your where conditions, or without them if you need ANY entry
          id: data_detalle.cotizacion_id,
        },
        order: [ [ 'createdAt', 'DESC' ]]
      }
    );

    const data_cliente = await Clientes.findOne(
      {
        id: data_cotizacion.cliente_id
      }
    )


    const sameDetalle = await Detalles.findAll({cotizacion_id})

    // const articulos = await Articulos.findOne({articulo_id})

    // console.log('articulos')
    // console.log(articulos)

    createPDF(
      data_cliente,
      data_cotizacion,
      sameDetalle,
      // articulos

    );

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

// Retrieve all Detalle from the database.
exports.findOne = async(req, res = response) => {

  const cotizacion_id = req.params.cotizacion_id;

  try {
    
    const respuesta = await Detalles.findOne(
      
      {
        where: {
          cotizacion_id
        },
        order: [ [ 'createdAt', 'DESC' ]]
      }
    );

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

// // Find a single Detalle with an id
// exports.findOne = async( req, res = response ) => {
//   const id = req.params.id;

//   console.log(req.params)

//   try {

//     const respuesta = await Detalles.findByPk( id );

//     res.status( 200 ).json({
//       ok: true,
//       Detalle: respuesta
//     })

//   } catch ( error ) {
//     res.status( 500 ).send({
//       ok: false,
//       message: "Error al traer al Detalle con el id = " + id,
//       error
//     });
//   }
// };

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