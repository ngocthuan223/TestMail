const { contract_pdf_template_rs } = require('../entities/models_stagging/index');
const CommonService = require('./CommonService');
const ContractPdfRsDemoService = require('./ContractPdfRsDemoService');

const getAll = async () => {
    return await CommonService.getAll(contract_pdf_template_rs);
}

const create = async (pdf_template) => {
    return await contract_pdf_template_rs.create(pdf_template);
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
    const pdf = await contract_pdf_template_rs.findOne({where: {template_name, reseller_id}, raw: true});
    if(!pdf) {
        throw Error('Not Found');
    }
    const result = await ContractPdfRsDemoService.createOrUpdate(pdf);
    return result;
}

const copyToOtherResellers = async (template_name, reseller_id) => {
    const pdf = await contract_pdf_template_rs.findOne({where: {template_name, reseller_id}, raw: true});
    if(!pdf) {
        throw Error('Not Found');
    }
    delete pdf.reseller_id;
    delete pdf.id;
    const result = await contract_pdf_template_rs.update(pdf, { where: { template_name: pdf.template_name } });
    return result;
}

const createOrUpdate = async (pdf) => {
    return new Promise(async (resolve, reject) => {
        const pdfEdit = await contract_pdf_template_rs.findOne(
            {
                where: {
                    template_name: pdf?.template_name,
                    reseller_id: 197
                }, raw: true
            }
        );
        if(pdfEdit) {
            pdfEdit.template_nl = pdf.template_nl,
            pdfEdit.template_en = pdf.template_en,
            pdfEdit.template_name = pdf.template_name,
            await contract_pdf_template_rs.update(pdfEdit, {where: {id: pdf.id}});
            return resolve(pdfEdit);;
        }
        delete pdf.id;
        pdf.created_date = new Date();
        pdf.reseller_id = 197;
        contract_pdf_template_rs.create(pdf).then(async (result) => {
            return resolve(result);
        }, (e) => {
            console.log(e);
            reject({ error: "Internal Error" });
        });
    });
}

module.exports = {
    create,
    update,
    getById,
    deleteById,
    getAll,
    copyToDemo,
    copyToOtherResellers,
    createOrUpdate
};