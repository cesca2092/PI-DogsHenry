const fetch = require("node-fetch");
const { Router } = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Breed, Temperament} = require('../db')
const { Op } = require("sequelize");
require("dotenv").config();

const router = Router();
router.use(jsonParser);

const {
    API_KEY
  } = process.env;



const buildLocalArray = (array) => {

    const localDog = array && array.map(dogDB => {
        let temperament = dogDB.dataValues.temperaments.map(temp => temp.dataValues.name);
        let dog = {
            id: dogDB.id,
            image: null,
            name: dogDB.name,
            temperament,
            weight: dogDB.weight,
            localDB: dogDB.localDB
        }
        return dog;            
    });
    return localDog;

}

const consultaLocal = async (name) => {
    const dogsDB = !name ? 
        await Breed.findAll({include: Temperament})
        : await Breed.findAll({
            include: Temperament,
            where:{
                name:{
                    [Op.substring]: name
                }
            }
        });
    return buildLocalArray(dogsDB);
}

const consultaAPI = async (name) => {

    
    const url = name ? 
        `https://api.thedogapi.com/v1/breeds/search?q=${name}` 
        : `https://api.thedogapi.com/v1/breeds`;

    const consulta = await fetch(url)
    const respuesta = await consulta.json();

    const dogFilter = name ? 
        respuesta.filter(dog => dog.reference_image_id) 
        : respuesta;

    const apiDog = name ? 
        dogFilter.map(async dogApi => {
            const dogImg = await fetch(`https://api.thedogapi.com/v1/images/${dogApi.reference_image_id}`);           
            const dog = await dogImg.json();
            return dog;
        })
        :dogFilter.map(dogAPI => {
            let temperament = dogAPI.temperament && dogAPI.temperament.split(',').map(e=>e.trim().toLowerCase());
            let trymetricweight = dogAPI.weight.metric !== 'NaN' ? dogAPI.weight.metric : dogAPI.weight.imperial;
            let weight = dogAPI.weight.metric === 'NaN' ? trymetricweight.split(' – ').map(e=>e*0.453592).map(e=>Math.ceil(e)).join('-')
                            : trymetricweight;
            let dog = {
                id: dogAPI.id,
                image: dogAPI.image.url,
                name: dogAPI.name.toLowerCase(),
                temperament,
                weight,
                localDB: false
            }
            return dog;
        });

    const dogs = name ? await Promise.all(apiDog) : apiDog;
    const dogArray = name ?
        dogs.map(dogAPI => {
            let temperament = dogAPI.breeds[0].temperament && dogAPI.breeds[0].temperament.split(',').map(e=>e.trim().toLowerCase());
            let trymetricweight = dogAPI.breeds[0].weight.metric !== 'NaN' ? dogAPI.breeds[0].weight.metric : dogAPI.breeds[0].weight.imperial;
            let weight = dogAPI.breeds[0].weight.metric === 'NaN' ? trymetricweight.split(' – ').map(e=>e*0.453592).map(e=>Math.ceil(e)).join('-')
                            : trymetricweight;
            let dog = {
                id: dogAPI.breeds[0].id,
                image: dogAPI.url,
                name: dogAPI.breeds[0].name.toLowerCase(),
                temperament,
                weight,
                localDB: false
            }
            return dog;
            
        })
        :
        dogs;


    return dogArray;

}

const buildLocalArrayById = (array) => {
    const localDog = array && array.map(dogDB => {
        let temperament = dogDB.dataValues.temperaments.map(temp => temp.dataValues.name);
        let dog = {
            id: dogDB.id,
            image: null,
            name: dogDB.name,
            temperament,
            height: dogDB.height,
            weight: dogDB.weight,
            life_span: dogDB.life_span,
            localDB: dogDB.localDB
        }
        return dog;            
    });

    return localDog;
}

const apiArrayById = async (id) => {
    const url = `https://api.thedogapi.com/v1/breeds`;
    const request = await fetch(url);
    const allDogs = await request.json()

    const dog = allDogs.filter(dog => dog.id == id);
    
    let temperament = dog[0].temperament ? 
                    dog[0].temperament.split(',').map(e=>e.trim().toLowerCase())
                    : 'No temperaments registered';

    let image = dog[0].image.url ? 
                    dog[0].image.url
                    : 'Dog Without Picture';

    let trymetricweight = dog[0].weight.metric !== 'NaN' ? dog[0].weight.metric : dog[0].weight.imperial;
    let weight = dog[0].weight.metric === 'NaN' ? trymetricweight.split(' – ').map(e=>e*0.453592).map(e=>Math.ceil(e)).join('-')
                            : trymetricweight;
        
    
    return [{
        id: dog[0].id,
        image,
        name: dog[0].name.toLowerCase(),
        temperament,
        height: dog[0].height.metric,
        weight,
        life_span: dog[0].life_span.split('years')[0].trim(),
        localDB: null
    }] 
    
}




router.get('/', async (req,res) => {
    const {name} = req.query;

    try {
        const local = await consultaLocal(name);
        const api = await consultaAPI(name);

        const data = local.length > 0 || api.length > 0 ? 
                        [...local, ...api] 
                        : { msg:"Can't find dog breed"};

        res.json(data);

    } catch (error) {
        console.log(error);
    }
    
});


router.get('/:idBreed', async (req,res) => {
    const {idBreed} = req.params;
    let consulta = [];

    try {
        if(!idBreed.includes('-')){
            consulta = await apiArrayById(idBreed);
            res.json(consulta);
        } else {
            consulta = await Breed.findAll({
                include: Temperament,
                where: {
                    id: idBreed
                }
            });
            res.json(buildLocalArrayById(consulta))
            
        }
    } catch (error) {
        console.log(error)
    }

});

module.exports = router;