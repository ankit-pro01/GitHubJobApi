import React from "react"
import "./Form.css"



export default function Form({params, handleParamsChange}){
    
    return(
        <div className = "form">
            <input type ="text" placeholder = "Search job" value = {params.description} onChange = {handleParamsChange} name = "description"/>
            <input type = "text" placeholder = "location" value = {params.location} onChange = {handleParamsChange} name = "location" />
            <input type = "checkbox" value = {params.full_time} onChange = {handleParamsChange} />full time
        </div>
    )
}