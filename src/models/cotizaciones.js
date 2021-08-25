module.exports = (sequelize, Sequelize) => {
  const Cotizacion = sequelize.define("Cotizaciones", {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    folio: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    cliente_id: {
      type: Sequelize.INTEGER,
      references: {
        // Este es el nombre del modelo al que hace referencia
        model: 'Clientes',
   
        // Esta es la columna que hace referencia al modelo
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
    },
    cliente_nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descripcion: {
      type: Sequelize.STRING(1234),
    },
    fecha_validez: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    valido_hasta: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Cotizacion;
};