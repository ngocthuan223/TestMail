const { mail_template_rs } = require('../entities/models_demo/index');

const createOrUpdate = async (mail) => {
    return new Promise(async (resolve, reject) => {
        const mailEdit = await mail_template_rs.findOne({
            where: {
                mail_name: mail?.mail_name,
            }, raw: true});

        if(mailEdit) {
            delete mail.reseller_id;
            delete mail.id;
            mail_template_rs.update(
                mail,
                {
                    where: {
                        mail_name: mail?.mail_name
                    }
                }).then(async (result) => {
                    return resolve(result);
                }, (e) => {
                    reject({ error: "Internal Error" });
                });
        } else {
            mail_template_rs.create(
                {...mail, id: undefined}
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