import React, { useState } from "react"
import "./Job.css"

import ReactMarkdown from "react-markdown";
const customStyle = {
    display : "block"
}

export default function Job({job}){

    const [showDetails, setShowDetails ] = useState(false)
    
    return(
        <div className = "card">
            <h4>{job.title}</h4><span>{job.company}</span>
            <p>{new Date(job.created_at).toLocaleDateString()}</p>
            <span>{job.type}</span><span>{job.location}</span>
            <ReactMarkdown source = {job.how_to_apply} />
            
            <button onClick = {() => setShowDetails(prev => !prev)}>View details</button>
            <div style = {showDetails ? customStyle : {display: "none"}}>
                <p>{job.description}</p>
            </div>
            <div className = "logo">
            <img src = {job.company_logo} height = {40} />

            </div>

        </div>
    )
}