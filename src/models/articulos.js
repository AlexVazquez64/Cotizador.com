const express = require('express');

module.exports = (sequelize, Sequelize) => {
  const Articulos = sequelize.define("Articulos", {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING
    },
    descripcion: {
      type: Sequelize.STRING
    },
    unidad_venta: {
      type: Sequelize.STRING
    },
    tipo_articulo: {
      type: Sequelize.STRING
    },
    descripcion_larga: {
      type: Sequelize.STRING
    },
    precio_unitario: {
      type: Sequelize.DOUBLE
    },
    costo: {
      type: Sequelize.DOUBLE
    },
  });

  return Articulos;
};