const express = require('express');
const router = express();
const { mail_template } = require('../entities/models_stagging/index');
const { MailService } = require('../services');
const { sendMail } = require('../ultils/SendMail');

router.get('/', async (req, res) => {
    await mail_template.findAll({
        attributes: [
            'id',
            'mail_name',
            'lang_key',
            'subject',
            'subject_nl'
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
    await mail_template.findOne({
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
        const result = await mail_template.create(mail);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

router.post('/save', async (req, res) => {
    try {
        const mail = req.fields;
        const result = await mail_template.update(mail, { where: { id: mail.id } });
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

router.post('/copy-to-demo', async (req, res) => {
    try {
        const mail_name = req.fields.mail_name;
        if(!mail_name) {
            res.sendStatus(404);
        }
        const result = await MailService.copyToDemo(mail_name);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

router.post('/copy-to-white-rs', async (req, res) => {
    try {
        const mail_name = req.fields.mail_name;
        const reseller_id = req.fields.reseller_id;
        if(!mail_name) {
            res.sendStatus(404);
        }
        const result = await MailService.copyToWhiteRs(mail_name, reseller_id || 197);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await mail_template.destroy({ where: { id } });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);

    }
});

router.post('/restore-from-demo', async (req, res) => {
    try {
        const mail_name = req.fields.mail_name
        const result = await MailService.restoreFromDemo(mail_name);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);

    }
});

module.exports = router;