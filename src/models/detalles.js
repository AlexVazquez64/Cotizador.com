const express = require('express');

module.exports = (sequelize, Sequelize) => {
  const Detalles = sequelize.define("Detalles", {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    cotizacion_id: {
      type: Sequelize.INTEGER,
      references: {
        // This is a reference to another model
        model: 'Cotizaciones',
   
        // This is the column name of the referenced model
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
      
    },
    articulo_id: {
      type: Sequelize.INTEGER,
      references: {
        // This is a reference to another model
        model: 'Articulos',
   
        // This is the column name of the referenced model
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
      
    },
    cantidad: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    precio_unitario: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    importe: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    
  });

  return Detalles;
};
