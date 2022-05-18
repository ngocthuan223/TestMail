const { contract_pdf_template } = require('../entities/models_stagging/index');
const CommonService = require('./CommonService');
const ContractPdfDemoService = require('./ContractPdfDemoService');

const getAll = async () => {
    return await CommonService.getAll(contract_pdf_template);
}

const create = async (pdf_template) => {
    return await CommonService.create(contract_pdf_template, pdf_template);
}

const update = async (pdf_template) => {
    return await CommonService.update(contract_pdf_template, pdf_template);
}

const getById = async (id) => {
    return await CommonService.getById(contract_pdf_template, id);
}

const copyToDemo = async (template_name) => {
    const pdf = await contract_pdf_template.findOne({where: {template_name}});
    const result = await ContractPdfDemoService.createOrUpdate(pdf);
    return result;
}


module.exports = {
    create,
    update,
    getById,
    getAll,
    copyToDemo
};