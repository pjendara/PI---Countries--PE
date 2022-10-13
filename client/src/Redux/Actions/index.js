import axios from "axios";
import { FILTER_COUNTRIES, GET_COUNTRIES, GET_COUNTRIES_BY_NAME, ORDER_COUNTRIES_ALF, ORDER_COUNTRIES_POP ,GET_TOURIST_ACTIVITIES, GET_COUNTRY_DETAIL, GET_COUNTRIES_QUERY, FILTER_BY_ACTIVITIES } from "../action-types/actionTypes"; 

export function getCountries(){
    return async function(dispatch){
        let json = await axios.get("https://pi-countries-pe-production.up.railway.app/countries",{
        });
    return dispatch({
        type: GET_COUNTRIES,
        payload: json.data
    })
    }
}

export function filterByContinents(payload){
    return {
        type: FILTER_COUNTRIES,
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_COUNTRIES_ALF,
        payload
    }
}

export function orderByPop(payload) {
    return {
        type: ORDER_COUNTRIES_POP,
        payload
    }
}

export function getCountriesDetail(id){
    return async function (dispatch){
        try {
            var json = await axios.get("https://pi-countries-pe-production.up.railway.app/countries/" + id)
            return dispatch ({
                type: GET_COUNTRY_DETAIL,
                payload: json.data
            })
        } catch (error){
          console.log(error);
        }     
    }
}

export default function getCountriesSearch(name){
    return async function (dispatch){
        try {
            var json = await axios.get("https://pi-countries-pe-production.up.railway.app/countries?name=" + name.charAt(0).toUpperCase() + name.slice(1))
            return dispatch ({
                type: GET_COUNTRIES_QUERY,
                payload: json.data
            })
        } catch (error){
          console.log(error);
        }
    }
}

export function filterByAct(activity){
    return{
        type: FILTER_BY_ACTIVITIES,
        payload: activity
    }
}

export function getActivities(){
    return (dispatch) => {
        axios
          .get(`https://pi-countries-pe-production.up.railway.app/activities`)
          .then((info) => {
            return dispatch({
              type: GET_TOURIST_ACTIVITIES,
              payload: info.data,
            });
          })
          .catch((err) => console.log(err));
      };
    };


export function postActivity (payload){
    return async function(dispatch){
        const response = await axios.post("https://pi-countries-pe-production.up.railway.app/activities", payload)
        console.log(response)
        return response
    }
}

export function getCountriesByName (name) {
    console.log(name)
        return {
            type: GET_COUNTRIES_BY_NAME,
            payload: name,
            
        }
     
}