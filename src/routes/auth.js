// Otra forma de utiliar Router ---
// const express = require('express');
// const router = express.Router

/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, loginUser } = require('../controllers/auth');

const { validarCampos } = require('../middlewares/validar-campos');

router.post(
  '/new',
  [ // middlewares
    check( 'nombre', 'El nombre es obligatorio' ).notEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'password', 'El password debe de ser de 6 caracteres' ).isLength({ min: 6 }),
    validarCampos
  ],
  createUser
);

router.post(
  '/',
  [ // middlewares
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'password', 'El password debe de ser de 6 caracteres' ).isLength({ min: 6 }),
    validarCampos
  ],
  loginUser
);

module.exports = router;