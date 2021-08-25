const express = require('express');

module.exports = (sequelize, Sequelize) => {
  const Articulos = sequelize.define("Articulos", {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    descripcion: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    unidad_venta: {
      type: Sequelize.STRING
    },
    tipo_articulo: {
      type: Sequelize.STRING
    },
    precio_unitario: {
      type: Sequelize.DECIMAL(10, 2)
    },
    costo: {
      type: Sequelize.DECIMAL(10, 2)
    },
  });

  return Articulos;
};