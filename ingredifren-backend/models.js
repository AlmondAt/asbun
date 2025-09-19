// Sequelize models for akg_master and asbun_log_harian
// This file defines the database models and their associations

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AKGMaster = sequelize.define('akg_master', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    jenis_kelamin: { type: DataTypes.STRING(1), allowNull: false },
    kategori_usia: { type: DataTypes.STRING, allowNull: false },
    nutrisi: { type: DataTypes.STRING, allowNull: false },
    nilai: { type: DataTypes.FLOAT, allowNull: false },
    unit: { type: DataTypes.STRING, allowNull: false },
    keterangan: { type: DataTypes.TEXT, allowNull: true },
    kondisi_khusus: { type: DataTypes.JSON, allowNull: true },
  }, {
    tableName: 'akg_master',
    timestamps: false,
  });

  const AsbunLogHarian = sequelize.define('asbun_log_harian', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: true },
    tanggal: { type: DataTypes.DATEONLY, allowNull: false },
    profil: { type: DataTypes.JSON, allowNull: false },
    hasil_analisis: { type: DataTypes.JSON, allowNull: false },
  }, {
    tableName: 'asbun_log_harian',
    timestamps: false,
  });

  return { AKGMaster, AsbunLogHarian };
};
