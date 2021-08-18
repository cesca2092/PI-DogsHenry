const { Router } = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Breed, Temperament} = require('../db')


const router = Router();
router.use(jsonParser);

router.post('/', async (req,res) => {
    const { name, height, weight, life_span, temperaments } = req.body;

    try {
        const dog = await Breed.findOrCreate({
            where: {
                name,
                height,
                weight,
                life_span,
                localDB: true
            }
        });
    
        const tempsPromise = temperaments.map( temp => Temperament.findOrCreate({
            where:{
                name:temp
            }
        }))

        const temps = Promise.all(tempsPromise);
        //arreglo donde se guardan los id de los temperamentos creados
        arr=[];
        temps.then(temp => {
            temp.forEach((e,i) => {
                arr.push(e[0].dataValues.id)
                if(i === temperaments.length -1) Promise.all([dog[0].setTemperaments(arr)]);
            });
            
        })
    
        res.json({msg:"Dog Breed saved Successfully"})

    } catch (error) {
        // console.log(error);
        res.json({error});
    }
    

    
})

module.exports = router;