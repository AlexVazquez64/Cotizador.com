const express = require('express');

module.exports = (sequelize, Sequelize) => {
  const Clientes = sequelize.define("Clientes", {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING
    },
    rfc: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING
    },
    telefono: {
      type: Sequelize.STRING
    },
    contacto: {
      type: Sequelize.STRING
    },
    direccion: {
      type: Sequelize.STRING
    },
    telefono_contacto: {
      type: Sequelize.STRING
    },
    descuento: {
      type: Sequelize.DOUBLE
    }
  });

  return Clientes;
};