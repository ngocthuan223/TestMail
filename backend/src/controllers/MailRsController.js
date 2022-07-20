const express = require('express');
const router = express();
const { mail_template_rs } = require('../entities/models_stagging/index');
const { MailRsService } = require('../services');
const { sendMail } = require('../ultils/SendMail');

router.get('/', async (req, res) => {
    const reseller_id = req.query.reseller_id;
    const mail_name = req.query.mail_name;

    const where = {};
    if(reseller_id) {
        where.reseller_id = reseller_id;
    }
    if(mail_name) {
        where.mail_name = mail_name;
    }
    await mail_template_rs.findAll({
        where,
        attributes: [
            'id',
            'mail_name',
            'lang_key',
            'subject',
            'subject_nl',
            'reseller_id'
        ],
        order: [
            ['id', 'DESC'],
        ],
    }).then((result) => {
        res.status(200).json(result);
    }, (error) => {
        console.log(error)
        res.status(500).json({
            message: "Get error",
            error: error
        })
    });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    await mail_template_rs.findOne({
        where: {
            id
        },
        order: [
            ['id', 'DESC'],
        ],
    }).then((result) => {
        res.status(200).json(result);
    }, (error) => {
        console.log(error)
        res.status(500).json({
            message: "Get error",
            error: error
        })
    });
});


router.post('/create', async (req, res) => {
    try {
        const mail = req.fields;
        const result = await mail_template_rs.create(mail);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

router.post('/save', async (req, res) => {
    try {
        const mail = req.fields;
        const result = await mail_template_rs.update(mail, { where: { id: mail.id } });
        return res.status(200).json(result);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.post('/sendmail', async (req, res) => {
    try {
        await sendMail(req.fields.mail_template_nl, req.fields.emailTo);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);

    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await mail_template_rs.destroy({ where: { id } });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);

    }
});

router.post('/copy-to-demo', async (req, res) => {
    try {
        const mail_name = req.fields.mail_name;
        const reseller_id = req.fields.reseller_id;
        if(!mail_name) {
            res.sendStatus(404);
        }
        const result = await MailRsService.copyToDemo(mail_name, reseller_id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

router.post('/copy-to-other-reseller', async (req, res) => {
    try {
        const mail_name = req.fields.mail_name;
        const reseller_id = req.fields.reseller_id;
        if(!mail_name) {
            res.sendStatus(404);
        }
        const result = await MailRsService.copyToOtherResellers(mail_name, reseller_id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

module.exports = router;