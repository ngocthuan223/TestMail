const { mail_template_rs } = require('../entities/models_demo/index');

const createOrUpdate = async (mail) => {
    return new Promise(async (resolve, reject) => {
        const mailEdit = await mail_template_rs.findOne({
            where: {
                mail_name: mail?.mail_name,
                reseller_id: mail?.reseller_id
            }, raw: true});
        mail_template_rs.create(
            mailEdit ? 
                {...mail, id: mailEdit.id} :
                {...mail, id: undefined},
            {
                updateOnDuplicate: [
                    'mail_name',
                    'lang_key',
                    'subject',
                    'subject_nl',
                    'mail_template_en',
                    'mail_template_nl',
                    'footer',
                    'footer_nl',
                ]
            }
        ).then(async (result) => {
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