const { Router } = require('express');
const { Activity, Country } = require('../db.js');


const router = Router();

// Ruta para desplegar actividades
router.get('/activities', async (req, res) => {

    const activities = await Activity.findAll();
    if(activities) {
      return res.status(200).json(activities);
    } else {
      return res.status(404).json("No se encontraron activdades"); 
    }
  
  });



//Ruta de posteo de nueva actividad
router.post('/activities', async (req, res,) => {
    const { name, difficulty, duration, season, countries } = req.body;

    if(!name || !difficulty || !duration || !season || !countries){
        return res.status(400).send("Campos incompletos");
    }

try{
    const newActivity = await Activity.create ({
        name,
        difficulty,
        duration,
        season,
              
    })

    countries.forEach(async (id) => {
      const country = await Country.findOne({
          where: {id: {[Op.iLike]:`%${id}%`}}
              })
      await country?.addActivity(Activity);
    })
    //if(country) await newActivity
    res.status(200).json(newActivity)
   
    
        
  } catch (error) {
    res.send(error);
  }
});  



module.exports = router;