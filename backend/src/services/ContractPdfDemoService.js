const { contract_pdf_template } = require('../entities/models_demo/index');

const createOrUpdate = async (pdf) => {
    return new Promise(async (resolve, reject) => {
        const pdfEdit = await contract_pdf_template.findOne({where: {template_name: pdf?.template_name}, raw: true});
        contract_pdf_template.create(pdfEdit ? {...pdf, id: pdfEdit.id} : pdf, {
            updateOnDuplicate: [
                'template_name',
                'lang_key',
                'template_en',
                'template_nl',
            ]
        }).then(async (result) => {
            return resolve(result);
        }, (e) => {
            console.log(e);
            reject({ error: "Internal Error" });
        });
    });
} 
module.exports = {
    createOrUpdate
};