const express = require('express');
const router = express();
const { ContractPdfService } = require('../services');

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) {
            return res.sendStatus(404);
        }
        const pdf = await ContractPdfService.getById(id);
        return res.status(200).json(pdf);
    } catch (error) {
        return res.sendStatus(500);
    }
});

router.get('/', async (req, res) => {
    try {
        const pdfs = await ContractPdfService.getAll();
        return res.status(200).json(pdfs);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/create', async (req, res) => {
    try {
        const pdf = req.fields;
        const result = await ContractPdfService.create(pdf);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

router.post('/save', async (req, res) => {
    try {
        const pdf = req.fields;
        const result = await ContractPdfService.update(pdf);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

router.post('/copy-to-demo', async (req, res) => {
    try {
        const template_name = req.fields.template_name;
        if(!template_name) {
            res.sendStatus(404);
        }
        const result = await ContractPdfService.copyToDemo(template_name);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

router.post('/copy-to-white-rs', async (req, res) => {
    try {
        const id = req.fields.id;
        if(!id) {
            res.sendStatus(404);
        }
        const result = await ContractPdfService.copyToWhiteRs(id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});


router.post('/restore-from-demo', async (req, res) => {
    try {
        const template_name = req.fields.template_name
        const result = await ContractPdfService.restoreFromDemo(template_name);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);

    }
});
module.exports = router;