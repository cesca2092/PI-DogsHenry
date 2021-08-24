//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { default: fetch } = require('node-fetch');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Breed, Temperament } = require('./src/db.js');


const dogsTest =[
  {
    localDB: true,
    name:'dog1',
    height: 'height1',
    weight: '1 - 10'
  },
  {
    localDB: true,
    name:'dog2',
    height: 'height2',
    weight: '2 - 8'
  }
];

// const tempTest = ["Stubborn",' Curious',' Playful', 'Adventurous', 'Active', "Fun-loving"];

const callApi = async () => {
  let arr = [];
  const url = `https://api.thedogapi.com/v1/breeds`;
  const consult = await fetch(url);
  const result = await consult.json();
  const temperaments = result.map(dog => dog.temperament);

  temperaments.forEach(e => {
    if(e){
      let stringToArray = e.split(',').map(e => e.toLowerCase()).map(e => e.trim());
      arr.push(stringToArray)
    }
  });

  let tempsArray = [];
  arr.forEach(e => {
    e.forEach(e => !tempsArray.includes(e) && tempsArray.push(e))
  })
  return (tempsArray.sort())
}



// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console

    try {
      const arrayTemps = await callApi();
      const temp = arrayTemps.map(temp => Temperament.create({name:temp}))
      const dogs = dogsTest.map(dog => Breed.create(dog));
      
      Promise.all(temp);
      const relation = Promise.all(dogs);
      relation.then( async res => {
        await res[0].setTemperaments([1,2,4,100,121])
        await res[1].setTemperaments([3,5,6,99])
      });
    } catch (error) {
      console.log(error)
    }
  });
});
