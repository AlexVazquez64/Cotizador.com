const { response } = require( 'express' );
const { db } = require( '../models/index' );

const Articulos = db.articulos;
const Op = db.Sequelize.Op;

// Create and Save a new Cliente
exports.create = async(req, res = response) => {

  // Create a Artículo
  const data_articulo = {
    nombre,
    descripcion,
    unidad_venta,
    tipo_articulo,
    precio_unitario,
    costo,

  } = req.body;

  try {
    let articulo = await Articulos.findOne({
      where: {
        nombre
      }
    });

    if ( articulo ) {
      return res.status( 400 ).json({
        ok: false,
        message: 'Ya existe un Articulo con esa descripcion',
      });
    }

    articulo = new Articulos( req.body );

    // Save User in the database
    await Articulos.create( data_articulo );

    res.status( 200 ).json({
      ok: true,
      cliente: {
        data_articulo
      },
      message: 'Se ha creado el Articulo exitosamente!'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
};

// Retrieve all Users from the database.
exports.findAll = async(req, res = response) => {
  
  try {
    
    const respuesta = await Articulos.findAll();

    res.status(200).json({
      ok: true,
      articulo: {
        values: respuesta
      }
      
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message:
        error.message || "Algún error ocurrió al momento de traer los Articulo."
    });
  }

};

// Find a single User with an id
exports.findOne = async(req, res = response) => {
  const articulo_id = req.params.articulo_id;

  try {

    const respuesta = await Articulos.findOne(
      {
        where: {
          articulo_id
        },
        order: [ [ 'createdAt', 'DESC' ]]
      }
    );

    const { nombre, email } = respuesta;

    console.log(respuesta)
    res.status(200).json({
      ok: true,
      articulo: {
        nombre,
        email
      }
    })

  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error al traer al Articulo con el id = " + id,
      error
    });
  }
};

// Update a User by the id in the request
exports.update = async(req, res = response) => {
  const id = req.params.id;

  try {
    const respuesta = await Articulos.update(req.body, {
      where: { id: id }
    })
    if (respuesta == 1) {
      res.send({
        ok: true,
        message: "El articulo fue actualizado correctamente!"
      });
    } else {
      res.send({
        ok: false,
        message: `No se puede actualizar el articulo con el id = ${id}. Puede que el articulo no exista!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al actualizar el articulo con el id = " + id,
      error
    });
  }
};

// Delete a User with the specified id in the request
exports.delete = async(req, res) => {

  const id = req.params.id;

  try {

    const respuesta = await Articulos.destroy({
      where: { id: id }
    });
    
    if (respuesta == 1) {
      res.send({
        ok: true,
        message: "El articulo se ha borrado exitosamente!"
      });
    } else {
      res.send({
        ok: false,
        message: `No se pudo borrar el articulo con el id = ${id}. Puede que no se encuentre!`
      });
    }

  } catch ( error ) {
    res.status(500).send({
      message: "Error al eliminar el articulo con el id = " + id,
      error
    });
  }
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published User
exports.findAllPublished = (req, res) => {
  
};