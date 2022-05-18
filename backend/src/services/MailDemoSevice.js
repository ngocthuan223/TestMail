const { mail_template } = require('../entities/models_demo/index');
const CommonService = require('./CommonService');

const getAll = async () => {
    return await CommonService.getAll(mail_template);
}

const create = async (template) => {
    return await CommonService.create(mail_template, template);
}

const update = async (template) => {
    return await CommonService.update(mail_template, template);
}

const getById = async (id) => {
    return await CommonService.getById(mail_template, id);
}

const createOrUpdate = async (mail) => {
    return new Promise(async (resolve, reject) => {
        const mailEdit = await mail_template.findOne({where: {mail_name: mail?.mail_name}, raw: true});
        mail_template.create(mailEdit ? {...mail, id: mailEdit.id} : mail, {
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
        }).then(async (result) => {
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
    getAll,
    createOrUpdate
};