import axios from "axios";
import { FILTER_COUNTRIES, GET_COUNTRIES, ORDER_COUNTRIES_ALF, ORDER_COUNTRIES_POP ,GET_TOURIST_ACTIVITIES, GET_COUNTRY_DETAIL } from "../action-types/actionTypes"; 

export function getCountries(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/countries",{
            
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
            var json = await axios.get("http://localhost:3001/countries/" + id)
            return dispatch ({
                type: GET_COUNTRY_DETAIL,
                payload: json.data
            })
        } catch (error){
            console.log(error);
        }
        

       
    }
}

export function getCountriesQuery(name){
    return async function (dispatch){
        try {
            var json = await axios.get("http://localhost:3001/countries?name=" + name.charAt(0).toUpperCase() + name.slice(1))
            return dispatch ({
                type: GET_COUNTRY_DETAIL,
                payload: json.data
            })
        } catch (error){
            console.log(error);
        }
        

       
    }
}

export function filterActivity(payload){
    return{
        type: GET_TOURIST_ACTIVITIES,
        payload
    }
}

export function getActivities(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/activities",{
            
        });
    return dispatch({
        type: GET_TOURIST_ACTIVITIES,
        payload: json.data
    })
    }
}

export function postActivity (payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/activities", payload)
        console.log(response)
        return response
    }
}