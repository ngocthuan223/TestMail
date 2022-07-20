const { contract_pdf_template_rs } = require('../entities/models_demo/index');

const createOrUpdate = async (pdf) => {
    return new Promise(async (resolve, reject) => {
        const pdfEdit = await contract_pdf_template_rs.findOne(
            {where: {
                template_name: pdf?.template_name,
            }, raw: true});
        if(pdfEdit) {
            delete pdf.reseller_id;
            delete pdf.id;
            contract_pdf_template_rs.update(
                pdf,
                {
                    where: {
                        template_name: pdf?.template_name
                    }
                }).then(async (result) => {
                    return resolve(result);
                }, (e) => {
                    console.log(e);
                    reject({ error: "Internal Error" });
                });
        } else {
            contract_pdf_template_rs.create(
                {...pdf, id: undefined}
            ).then(async (result) => {
                return resolve(result);
            }, (e) => {
                console.log(e);
                reject({ error: "Internal Error" });
            });
        }
    });
} 
module.exports = {
    createOrUpdate
};