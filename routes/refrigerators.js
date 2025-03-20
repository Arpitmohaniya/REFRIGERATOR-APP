const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Refrigerator = require('../models/refrigerator');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

router.get('/', async (req, res) => {
    const refrigerators = await Refrigerator.find({});
    res.render('refrigerators/index', { refrigerators });
});

router.get('/new', (req, res) => {
    res.render('refrigerators/new');  
});



router.post('/', async (req, res) => {
    const { brand, price, image, desc, door } = req.body;
    await Refrigerator.create({ brand, price, image, desc, door });
    res.redirect('/refrigerators');
});

router.get('/:id', async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send('Invalid Refrigerator ID');

    const refrigerator = await Refrigerator.findById(req.params.id);
    if (!refrigerator) return res.status(404).send('Refrigerator Not Found');

    res.render('refrigerators/show', { refrigerator });
});

router.get('/:id/edit', async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send('Invalid Refrigerator ID');

    const refrigerator = await Refrigerator.findById(req.params.id);
    if (!refrigerator) return res.status(404).send('Refrigerator Not Found');

    res.render('refrigerators/edit', { refrigerator });
});

router.post('/:id/update', async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send('Invalid Refrigerator ID');

    const { price, image, desc, door } = req.body;
    await Refrigerator.findByIdAndUpdate(req.params.id, { price, image, desc, door });

    res.redirect(`/refrigerators/${req.params.id}`);
});

router.post('/:id/delete', async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).send('Invalid Refrigerator ID');

    await Refrigerator.findByIdAndDelete(req.params.id);
    res.redirect('/refrigerators');
});

module.exports = router;
