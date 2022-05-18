'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mail_template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  mail_template.init({
    mail_name: DataTypes.STRING(100),
    lang_key: DataTypes.STRING(6),
    subject: DataTypes.STRING(255),
    subject_nl: DataTypes.STRING(255),
    mail_template_en: DataTypes.TEXT,
    mail_template_nl: DataTypes.TEXT,
    footer: DataTypes.TEXT,
    footer_nl: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'mail_template',
    tableName: 'mail_template'
  });
  return mail_template;
};