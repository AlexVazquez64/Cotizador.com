const { response } = require( 'express' );


const bcrypt = require('bcryptjs');
const { db } = require( '../models/index' );

const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

const loginUser = async(req, res = response) => {

  const { email , password } = req.body;

  try {

    const usuario = await Usuario.findOne({ email });

    if ( !usuario ) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe ese usuario'
      });
    }

    // Confirmar los passwords
    const validatePassword = bcrypt.compareSync( password, usuario.password );

    if ( !validatePassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      });
    }

    res.json({
      ok: true,
      msg: 'Login correcto',
      uid: usuario.id,
      name: usuario.name,
  
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }
}

const createUser = async(req, res = response) => {

  const data_usuario = {
    nombre,
    email,
    password
  } = req.body

  console.log(data_usuario)

  try {

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    data_usuario.password = bcrypt.hashSync( password, salt );

    await Usuario.create( data_usuario )

    res.status(201).json({
      ok: true,
      nombre: data_usuario.nombre,
    
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }
}

module.exports = {
  createUser,
  loginUser,
}