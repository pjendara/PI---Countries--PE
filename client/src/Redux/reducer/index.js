import { FILTER_COUNTRIES, GET_COUNTRIES, GET_TOURIST_ACTIVITIES, ORDER_COUNTRIES_ALF, ORDER_COUNTRIES_POP, GET_COUNTRY_DETAIL, ADD_TOURIST_ACTIVITIES } from "../action-types/actionTypes";

const initialState = {
    countries: [],
    allCountries: [],
    allActivities: [],
    detail: {}
};

function rootReducer (state = initialState, action){
    switch(action.type) {
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case FILTER_COUNTRIES:
            const allCountries = state.allCountries
            const continentFiltered = action.payload === "All" ? allCountries : allCountries.filter(e => e.continent === action.payload)
            return{
                ...state,
                countries: continentFiltered
            }
        case ORDER_COUNTRIES_ALF:
            let sortedArr = action.payload === "asc" ?
            state.countries.sort(function (a, b) {
                if(a.name > b.name) {
                    return 1
                }
                if(b.name > a.name) {
                    return -1
                }
                return 0
            }) :
            state.countries.sort(function (a, b) {
                if(a.name > b.name) {
                    return -1
                }
                if(b.name > a.name) {
                    return 1
                }
                return 0
            })    
            return {
                ...state,
                countries: sortedArr
            }
            case ORDER_COUNTRIES_POP:
                let sortedArrPop = action.payload === "mayp" ?
                state.countries.sort(function (a, b) {
                    if(a.population > b.population) {
                        return 1
                    }
                    if(b.population > a.population) {
                        return -1
                    }
                    return 0
                }) :
                state.countries.sort(function (a, b) {
                    if(a.population > b.population) {
                        return -1
                    }
                    if(b.population > a.population) {
                        return 1
                    }
                    return 0
                })    
                return {
                    ...state,
                    countries: sortedArrPop
            }
        case GET_COUNTRY_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        case ADD_TOURIST_ACTIVITIES:
            return {
                ...state,
            }           
        case GET_TOURIST_ACTIVITIES:
            const allActivities = state.allActivities 
            const activityFiltered = action.payload === "All" ? allActivities : allActivities.filter(e => e.name === action.payload)
            return{
                ...state,
                activities: activityFiltered
            }
        default:
            return state;
    
    }

}

export default rootReducer;