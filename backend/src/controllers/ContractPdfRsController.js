const express = require('express');
const router = express();
const { ContractPdfRsService } = require('../services');
const { contract_pdf_template_rs } = require('../entities/models_stagging/index');

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
        await ContractPdfRsService.create(pdf);
        return res.status(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

router.post('/save', async (req, res) => {
    try {
        const pdf = req.fields;
        await ContractPdfRsService.update(pdf);
        return res.status(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

module.exports = router;