const ContractPdfRsService = require('./ContractPdfRsService');
const { contract_pdf_template } = require('../entities/models_stagging/index');
// const { contract_pdf_template: demo_contract_pdf_template } = require('../entities/models_demo/index');
const CommonService = require('./CommonService');
const ContractPdfDemoService = require('./ContractPdfDemoService');

const getAll = async () => {
    const pdfs = await contract_pdf_template.findAll({
        attributes: [
            'id',
            'template_name',
            'lang_key',
            'created_date'
        ]
    });
    return pdfs;
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
    const pdf = await contract_pdf_template.findOne({where: {template_name}, raw: true});
    const result = await ContractPdfDemoService.createOrUpdate(pdf);
    return result;
}

const copyToWhiteRs = async (id) => {
    const pdf = await contract_pdf_template.findOne({where: {id}, raw: true});
    const result = await ContractPdfRsService.createOrUpdate(pdf);
    return result;
}

const restoreFromDemo = async (template_name) => {
    const pdfDemo = await ContractPdfDemoService.getByName(template_name);
    if (pdfDemo) {
        const pdf = pdfDemo.get({ plain: true });
        delete pdf.id;
        await contract_pdf_template.update(pdf, {where: {
            template_name: pdf.template_name
        }})
        return pdf;
    }
}

module.exports = {
    create,
    update,
    getById,
    getAll,
    copyToDemo,
    copyToWhiteRs,
    restoreFromDemo
};