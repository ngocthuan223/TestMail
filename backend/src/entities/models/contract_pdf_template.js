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
    template_name: DataTypes.STRING(100),
    lang_key: DataTypes.STRING(6),
    template_en: DataTypes.TEXT,
    template_nl: DataTypes.TEXT,
    created_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'contract_pdf_template',
    tableName: 'contract_pdf_template'
  });
  return mail_template;
};