const { MailRsDemoSevice } = require('./MailRsDemoSevice');
const { mail_template_rs } = require('../entities/models_stagging/index');

const copyToDemo = async (mail_name, reseller_id) => {
    const mail = await mail_template_rs.findOne({where: {mail_name, reseller_id}, raw: true});
    if(!mail) {
        throw "Mail not found";
    }
    const result = await MailRsDemoSevice.createOrUpdate(mail);
    return result;
}

const createOrUpdate = async (mail) => {
    return new Promise(async (resolve, reject) => {
        const mailEdit = await mail_template_rs.findOne(
            {
                where: {
                    mail_name: mail?.mail_name,
                    reseller_id: mail?.reseller_id,
                }, raw: true
            }
        );
        if(mailEdit) {
            return reject("Mail white rs exist");
        }
        delete mail.id;
        mail_template_rs.create(mail, {
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

const copyToOtherResellers = async (mail_name, reseller_id) => {
    const mail = await mail_template_rs.findOne({where: {mail_name, reseller_id}, raw: true});
    if(!mail) {
        throw Error('Not Found');
    }
    delete mail.reseller_id;
    delete mail.id;
    const result = await mail_template_rs.update(mail, { where: { mail_name: mail.mail_name } });
    return result;
}


module.exports = {
    copyToDemo,
    createOrUpdate,
    copyToOtherResellers
};