const { Router } = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Temperament} = require('../db')


const router = Router();
router.use(jsonParser);

router.get('/', async (req,res) => {
    const temperaments = await Temperament.findAll();
    const arrayTemp = temperaments.map(temp => (
        {
            id: temp.dataValues.id,
            name: temp.dataValues.name
        }
    ));
    res.json(arrayTemp)
})


module.exports = router;