const { Router } = require('express');
const { Activities, Country } = require('../db.js');


const router = Router();

// Ruta para desplegar actividades
router.get('/activities', async (req, res) => {

    const activities = await Activities.findAll();
    if(activities) {
      return res.status(200).json(activities);
    } else {
      return res.status(404).json("No se encontraron activdades"); 
    }
  
  });



//Ruta de posteo de nueva actividad
router.post('/activities', async (req, res, next) => {
    const { name, difficulty, duration, season } = req.body;

    if(!name || !difficulty || !duration || !season){
        return res.status(400).send("Campos incompletos");
    }

try{
    const newActivity = await Activities.create ({
        name,
        difficulty,
        duration,
        season,
        
    })
    res.status(200).json(newActivity);

    const activityId = await Activities.findAll ({
        where: {name : name} 
    })

    //const country = await Country.findByPk(countryId);
    //await country.addTouristActivity(activityId[0].dataValues.id);

  } catch (error) {
    next(error);
  }
});  


module.exports = router;