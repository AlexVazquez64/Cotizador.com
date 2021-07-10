const express = require('express');

module.exports = (sequelize, Sequelize) => {
  const Usuarios = sequelize.define("Usuarios", {
    nombre: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      required: true,
    },
    
  });

  return Usuarios;
};