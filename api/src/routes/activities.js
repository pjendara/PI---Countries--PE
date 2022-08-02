const { Router } = require('express');
const { Activity, Country } = require('../db.js');
const { Op } = require("sequelize")


const router = Router();

// Ruta para desplegar actividades
router.get('/activities', async (req, res) => {

    const activities = await Activity.findAll();
    if(activities) {
      return res.status(200).json(activities);
    } else {
      return res.status(404).json(activities.length ? activities :"No se encontraron activdades"); 
    }
  
  });



//Ruta de posteo de nueva actividad
// router.post('/activities', async (req, res,) => {
//     const { name, difficulty, duration, season, countries } = req.body;

//     if(!name || !difficulty || !duration || !season || !countries){
//         return res.status(400).send("Campos incompletos");
//     }

// try{
//     const newActivity = await Activity.create ({
//         name,
//         difficulty,
//         duration,
//         season,
//         countries
              
//     })

//     res.status(200).json(newActivity)
   
//     const getId = await Activity.findAll({
//       where: { name: name}
//     })

//     const country = await Country.findByPk(countries);
//     await country.addActivity(getId[0].dataValues.id);
        
//   } catch (error) {
//     res.send(error);
//   }
// });  

router.post('/activities', async (req, res,) => {
  try {
    const {name, difficulty, duration, season, countries} = req.body
    if(name && difficulty && duration && season && countries){
        const activity = await Activity.create({
                name,
                difficulty,
                duration,
                season         
            });

        countries.forEach(async (id) => {
            const country = await Country.findOne({
                where: {id: {[Op.iLike]:`%${id}%`}}
                    })
            await country?.addActivity(activity);
        })

        return res.send(activity)
    } else {
        return res.status(404).json('Missing data')
    }
} catch (error) {
    next(error)
}
}
)


module.exports = router;