const express = require('express');
const router = express();
const { ContractPdfRsService } = require('../services');
const { contract_pdf_template_rs } = require('../entities/models_stagging/index');

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) {
            return res.sendStatus(404);
        }
        await contract_pdf_template_rs.findOne({
            where: {id}
        }).then((result) => {
            res.status(200).json(result);
        }, (error) => {
            console.log(error)
            res.status(500).json({
                message: "Get error",
                error: error
            })
        });
    } catch (error) {
        return res.sendStatus(500);
    }
});

router.get('/', async (req, res) => {
    try {
        const reseller_id = req.query.reseller_id;
        const pdf_name = req.query.pdf_name;

        const where = {};
        if(reseller_id) {
            where.reseller_id = reseller_id;
        }
        if(pdf_name) {
            where.template_name = pdf_name;
        }
        await contract_pdf_template_rs.findAll({
            where,
            attributes: [
                'id',
                'template_name',
                'lang_key',
                // 'template_nl',
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
    } catch (error) {
        
    }
});

router.post('/create', async (req, res) => {
    try {
        const pdf = req.fields;
        pdf.reseller_id = req.fields.reseller_id || 197;
        await ContractPdfRsService.create(pdf);
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

router.post('/save', async (req, res) => {
    try {
        const pdf = req.fields;
        await ContractPdfRsService.update(pdf);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

router.post('/copy-to-demo', async (req, res) => {
    try {
        const template_name = req.fields.template_name;
        const reseller_id = req.fields.reseller_id;
        if(!template_name) {
            res.sendStatus(404);
        }
        const result = await ContractPdfRsService.copyToDemo(template_name, reseller_id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

router.post('/copy-to-other-reseller', async (req, res) => {
    try {
        const template_name = req.fields.template_name;
        const reseller_id = req.fields.reseller_id;
        if(!template_name) {
            res.sendStatus(404);
        }
        const result = await ContractPdfRsService.copyToOtherResellers(template_name, reseller_id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});
module.exports = router;