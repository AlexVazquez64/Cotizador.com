module.exports = (sequelize, Sequelize) => {
  const Cotizacion = sequelize.define("Cotizaciones", {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    folio: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    },
    cliente_id: {
      type: Sequelize.INTEGER,
      references: {
        // This is a reference to another model
        model: 'Clientes',
   
        // This is the column name of the referenced model
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
    },
    cliente_nombre: {
      type: Sequelize.STRING
    },
    descripcion: {
      type: Sequelize.STRING(1234)
    },
    fecha_validez: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

  });

  return Cotizacion;
};