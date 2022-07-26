const { Router } = require('express');
const axios = require("axios")
const {Op, Country, Activity} = require("../db.js");



const router = Router();

//trae los paises de la API
const getApiInfo = async () => {
    const response = await axios.get("https://restcountries.com/v3/all")
    const map = await response.data.map(e => {
      const country = {
        id: e.cca3,
        name: e.name.common,
        imgFlag: e.flags[1],
        continent: e.continents[0],
        capital: e.capital != null ? e.capital[0] : "No data",
        subregion: e.subregion,
        area: e.area,
        population: e.population
        }
        return country
    })
    return map
    };

    //Carga
    const countriesToDb = async () => {
        try {
            const countries = await Country.findAll();
            if(!countries.length) {
                const array = await getApiInfo();
                await Country.bulkCreate(array)
                }
        } catch (error) {
          console.log(error)
        }
    };

    //alimenta la DB con lo que trajo
    const loadCountries = async () => { await countriesToDb() }
    loadCountries();


//Ruta general de todos los paises o por Query
router.get("/countries", async (req, res) => {
    // const nameQuery = req.query.name
    // const name = nameQuery.charAt(0).toUpperCase() + nameQuery.slice(1);

    const name = req.query.name
        
    try{
       if(!name){
            const countries = await Country.findAll({
                include:[{
                    model: Activity,
                    attributes: [ 'name', 'difficulty', 'duration', 'season',],
                    through: { attributes:[] }
                }]
            })
        
        if(countries){
            return res.status(200).json(countries);
        }else{
            return res.status(404).send("No se encontró paises");
        }
     } else {
        const country = await Country.findAll({
            where: {
                name: {[Op.substring]: name} 
            },
            include: [{ 
                model: Activity,
                attributes: [ 'name', 'difficulty', 'duration', 'season',],
                through: { attributes: [] }
            }] 
        })  
        if(country) {
            return res.status(200).json(country);
        } else {
            return res.status(404).send("País no encontrado");
        }
    }    
} catch (error) {
    console.log(error)
}
});


//Ruta a cada Pais segun ID
router.get('/countries/:idPais', async (req, res) => {
    const idPais = req.params.idPais
    
    try {
        const country = await Country.findOne({
            where: {
                id: idPais.toUpperCase()
            }, 
            include: [{ 
                model: Activity,
                attributes: [ 'name', 'difficulty', 'duration', 'season',],
                through: { attributes: [] }
            }] 
          })
          if(country) {
            return res.status(200).json(country);
        } else {
            return res.status(404).send("País no encontrado");
        } 
    } catch (error) {
        console.log(error)
    }
});



module.exports = router;

