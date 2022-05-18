const { contract_pdf_template_rs } = require('../entities/models_stagging/index');
const CommonService = require('./CommonService');
const ContractPdfRsDemoService = require('./ContractPdfRsDemoService');

const getAll = async () => {
    return await CommonService.getAll(contract_pdf_template_rs);
}

const create = async (pdf_template) => {
    return await CommonService.create(contract_pdf_template_rs, pdf_template);
}

const update = async (pdf_template) => {
    return await CommonService.update(contract_pdf_template_rs, pdf_template);
}

const getById = async (id) => {
    return await CommonService.getById(contract_pdf_template_rs, id);
}

const deleteById = async (id) => {
    return await CommonService.deleteById(contract_pdf_template_rs, id);
}

const copyToDemo = async (template_name, reseller_id) => {
    const pdf = await contract_pdf_template_rs.findOne({where: {template_name, reseller_id}});
    const result = await ContractPdfRsDemoService.createOrUpdate(pdf);
    return result;
}

module.exports = {
    create,
    update,
    getById,
    deleteById,
    getAll,
    copyToDemo
};