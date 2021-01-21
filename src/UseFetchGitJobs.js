import { useEffect, useReducer } from "react";

import axios from "axios";



const roundCORS = "https://cors-anywhere.herokuapp.com/"

const BASE_URL = roundCORS + "https://jobs.github.com/positions.json";


const ACTIONS = {
    MAKE_REQUEST : "make-request",
    GET_DATA : "get-data",
    ERROR : "error",
    HAS_NEXT_PAGE : "has_next_page"
}

const myReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {loading : true, jobs : []}
            
        case ACTIONS.GET_DATA:
            return {...state, loading : false, jobs : action.payload.jobs}
        case ACTIONS.ERROR :
            return { ...state, loading : false, error : action.payload.error, jobs : []}
        case ACTIONS.HAS_NEXT_PAGE :
            return { ...state, loading : false, hasNextPage : action.payload.hasNextPage}
    
        default:
            return state
    }
}

function UseFetchGitJobs(params, page) {

const [state, dispatch ] = useReducer(myReducer, {jobs : [], error : false, loading : true})

useEffect(() => {

    const CANCEL_TOKEN1 = axios.CancelToken.source() 
    dispatch({ type : ACTIONS.MAKE_REQUEST})
    axios.get(BASE_URL, {
        cancelToken : CANCEL_TOKEN1.token,
        params : { markdown: true, page: page, ...params}
    }).then( res => {
        dispatch({type : ACTIONS.GET_DATA, payload :{ jobs : res.data}})
    }).catch( err => {
        if(axios.isCancel(err)) return 
        dispatch({type : ACTIONS.ERROR, payload : {error : err}})
    })


    //another axios request for next page check.......

    const CANCEL_TOKEN2 = axios.CancelToken.source() 

    axios.get(BASE_URL, {
        cancelToken : CANCEL_TOKEN2.token,
        params : { markdown: true, page: page + 1, ...params}
    }).then( res => {
        dispatch({type : ACTIONS.HAS_NEXT_PAGE, payload :{ hasNextPage : res.data.length !== 0 }})
    }).catch( err => {
        if(axios.isCancel(err)) return 
        dispatch({type : ACTIONS.ERROR, payload : {error : err}})
    })



    return () => {
        CANCEL_TOKEN1.cancel()
        CANCEL_TOKEN2.cancel()

    }
}, [params, page])

  return state
}

export default UseFetchGitJobs;
