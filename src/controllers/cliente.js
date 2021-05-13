const { response } = require( 'express' );
const { db } = require( '../models/index' );

const Clientes = db.clientes;
const Op = db.Sequelize.Op;

// Create and Save a new Cliente
exports.create = async(req, res = response) => {

  // Create a Cliente
  const data_cliente = {
    nombre,
    rfc,
    email,
    telefono,
    contacto,
    direccion,
    telefono_contacto,
    descuento,

  } = req.body;

  try {
    let cliente = await Clientes.findOne({
      where: {
        email
      }
    });

    if ( cliente ) {
      return res.status( 400 ).json({
        ok: false,
        message: 'Ya existe un cliente con ese correo!',
      });
    }

    cliente = new Clientes( req.body );

    // Save Cliente in the database
    await Clientes.create( data_cliente );

    res.status( 200 ).json({
      ok: true,
      cliente: {
        data_cliente
      },
      message: 'El cliente se ha creado exitosamente!'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
};

// Retrieve all Cliente from the database.
exports.findAll = async(req, res = response) => {
  
  try {
    
    const respuesta = await Clientes.findAll();

    res.status(200).json({
      ok: true,
      clientes: {
        values: respuesta
      }
      
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message:
        error.message || "Algún error ocurrió al momento de traer los clientes."
    });
  }

};

// Find a single Cliente with an id
exports.findOne = async(req, res = response) => {
  const id = req.params.id;

  try {

    const respuesta = await Clientes.findByPk(id);

    const { nombre, email } = respuesta;

    console.log(respuesta)
    res.status(200).json({
      ok: true,
      Cliente: {
        nombre,
        email
      }
    })

  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error al traer al cliente con el id = " + id,
      error
    });
  }
};

// Update a Cliente by the id in the request
exports.update = async(req, res = response) => {
  const id = req.params.id;

  try {
    const respuesta = await Clientes.update(req.body, {
      where: { id: id }
    })
    if (respuesta == 1) {
      res.send({
        ok: true,
        message: "El cliente fue actualizado correctamente!."
      });
    } else {
      res.send({
        ok: false,
        message: `No se puede actualizar el cliente con el id = ${id}. Puede que el cliente no exista!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al actualizar el cliente con el id = " + id,
      error
    });
  }
};

// Delete a Cliente with the specified id in the request
exports.delete = async(req, res) => {

  const id = req.params.id;

  try {

    const respuesta = await Clientes.destroy({
      where: { id: id }
    });
    
    if (respuesta == 1) {
      res.send({
        ok: true,
        message: "El cliente fue borrado exitosamente!"
      });
    } else {
      res.send({
        ok: false,
        message: `No se pudo borrar el cliente con el id = ${id}. Puede que el cliente no se encuentre!`
      });
    }

  } catch ( error ) {
    res.status(500).send({
      message: "Error al eliminar el cliente con el id = " + id,
      error
    });
  }
};