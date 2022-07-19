const { Router } = require('express');
const axios = require("axios")
const {Op, Country, Activities} = require("../db.js");



const router = Router();

//trae los paises de la API
const getApiInfo = async () => {
    try {const apiUrl = await axios.get("https://restcountries.com/v3/all")
    const apiInfo = await apiUrl.data.map(e => {
      return {
        id: e.cca3,
        name: e.name.common,
        imgFlag: e.flags[1],
        continent: e.continents,
        capital: e.capital,
        subregion: e.subregion,
        area: e.area,
        population: e.population
        }})
        await Country.bulkCreate(apiInfo) 
        console.log("creado")
        return apiInfo
    }
            
    catch(error){
        console.log(error)
    }
};


//Si la DB esta vacía ==> la llena con la info de la Api segun el modelo
//const fillDb = async () => {
    // try {
    //     const onCountries = await Country.findall();
    //     if(!onCountries){
    //         const fillCountries = await getApiInfo();
    //         await Country.findOrCreate(fillCountries)
    //     }
    // } catch (error) {
    //     console.error();
    // }
//}

// const loadCountries = async () => { await fillDb() }
// loadCountries()


//Ruta general de todos los paises o por Query
router.get("/countries", async (req,res) => {
    const name = req.query.name
    let globalCountries = await getApiInfo();
    if(name){
        let countryName = await globalCountries.filter( e => e.name.toLowerCase().includes(name.toLowerCase())) 
        countryName.length ?
        res.status(200).send(countryName) :
        res.status(404).send("No existe el País")
    } else {
        res.status(200).send(globalCountries)
    }

})



//Ruta a cada Pais segun ID
router.get('countries/:idPais', async function (req, res) {
    try {
        let { idPais } = req.params
        let country = await Countries.findByPk(
            idPais.toUpperCase(),
            { include: { model: Activities } }
        )
        country ? res.json(country) : res.sendStatus(404)
    } catch (error) {
        res.status(505).send(error)
    }
})

module.exports = router;

