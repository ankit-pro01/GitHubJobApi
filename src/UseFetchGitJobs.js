import { useEffect, useReducer } from "react";

import axios from "axios";



const roundCORS = "https://cors-anywhere.herokuapp.com/"

const BASE_URL = roundCORS + "https://jobs.github.com/positions.json";


const ACTIONS = {
    MAKE_REQUEST : "make-request",
    GET_DATA : "get-data",
    ERROR : "error"
}

const myReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {loading : true, jobs : []}
            
        case ACTIONS.GET_DATA:
            return {...state, loading : false, jobs : action.payload.jobs}
        case ACTIONS.ERROR :
            return { ...state, loading : false, error : action.payload.error, jobs : []}
    
        default:
            return state
    }
}

function UseFetchGitJobs(params, page) {

const [state, dispatch ] = useReducer(myReducer, {jobs : [], error : false, loading : true})

useEffect(() => {

    const CANCEL_TOKEN = axios.CancelToken.source() 
    dispatch({ type : ACTIONS.MAKE_REQUEST})
    axios.get(BASE_URL, {
        cancelToken : CANCEL_TOKEN.token,
        params : { markdown: true, page: page, ...params}
    }).then( res => {
        dispatch({type : ACTIONS.GET_DATA, payload :{ jobs : res.data}})
    }).catch( err => {
        if(axios.isCancel(err)) return 
        dispatch({type : ACTIONS.ERROR, payload : {error : err}})
    })


    return () => {
        CANCEL_TOKEN.cancel()
    }
}, [params, page])

  return state
}

export default UseFetchGitJobs;
