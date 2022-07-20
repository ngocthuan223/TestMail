const { mail_template, mail_template_rs } = require('../entities/models_stagging/index');
const CommonService = require('./CommonService');
const MailDemoSevice = require('./MailDemoSevice');
const MailRsService = require('./MailRsService');

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

const copyToDemo = async (mail_name) => {
    const mail = await mail_template.findOne({where: {mail_name}, raw: true});
    if(!mail) {
        throw "Mail not found";
    }
    const result = await MailDemoSevice.createOrUpdate(mail);
    return result;
}

const copyToWhiteRs = async (mail_name, reseller_id) => {
    const mail = await mail_template.findOne({where: {mail_name}, raw: true});
    if(!mail) {
        throw "Mail not found";
    }
    mail.reseller_id = reseller_id
    const result = await MailRsService.createOrUpdate(mail)
    return result;
}

const restoreFromDemo = async (mail_name) => {
    const mailDemo = await MailDemoSevice.getByMailName(mail_name);
    if (mailDemo) {
        const mail = mailDemo.get({ plain: true });
        delete mail.id;
        await mail_template.update(mail, {where: {
            mail_name: mail.mail_name
        }})
        return mail;
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