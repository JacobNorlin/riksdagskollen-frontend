import {Promise} from 'es6-promise'
import * as fetch from 'isomorphic-fetch'


const API_BASE_URL = 'http://api.riksdagskollen.se/'

function callRiksdagskollenApi(endpoint: string, method: string) {
    var init = { 
        method
    }
     
    
    return fetch(API_BASE_URL+endpoint, init)
        .then((response:any) =>
            response
            .text()
            .then((text:string) => ({text, response}))
        ).then(({ text, response }) => {
            console.log(response)
            if (!response.ok) {
                return Promise.reject(text)
            }
            return text
        }).catch((err:any) => console.log(err))
}

export const CALL_RIKSDAGSKOLLEN_API = "CALL_RIKSDAGSKOLLEN_API" //Should be a Symbol

//middleware
export default (store: any) => (next: any) => (action: any) => {
    const callAPI = action[CALL_RIKSDAGSKOLLEN_API]
    if(callAPI=== undefined){
        return next(action)
    }
    
    const {endpoint, method, types} = callAPI
    const [requestType, successType, errorType] = types
    next({type:requestType})
    return callRiksdagskollenApi(endpoint, method).then(
        (response: any) => {
            next({
                response,
                type: successType
            })
        },
        (error: any) => {
            next({
                error: error.message || "Something went wrong...",
                type: errorType
            })
        }
    )
}