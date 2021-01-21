import React, { useState } from "react"
import "./Form.css"



export default function Form({params, handleParamsChange}){
    
    return(
        <div className = "form">
            <input type ="text" placeholder = "Search job" value = {params.description} onChange = {handleParamsChange} name = "description"/>
            <input type = "text" placeholder = "location" value = {params.location} onChange = {handleParamsChange} name = "location" />
            {/* <input type = "checkbox" value = {} onChange = {} />full time */}
        </div>
    )
}