import React, { useState } from "react"
import "./Pagination.css"



export default function Pagination({ page, setPage, hasNextPage}){

    const [pageList, setPageList] = useState([1])

    const [activePage, setCurrentActivePage] = useState(1)

    const handleNextClick = () => {
        const newPage = page + 1
        setPage(newPage)
        pageList.includes(newPage) ? console.log(newPage): setPageList([...pageList, newPage])
        setCurrentActivePage(newPage)
    }

    const handlePrevClick = () => {
        const newPage = page - 1
        setPage(newPage)
        pageList.includes(newPage) ? console.log(newPage): setPageList([...pageList, newPage])
        setCurrentActivePage(newPage)
    }

    const handlePageClick = (currPage) => {
        setCurrentActivePage(currPage)
        setPage(currPage)
    }
    
    return(
        <div className = "Pagination">
            {page > 1 &&<p className = "prev" onClick = {handlePrevClick}>&#60;</p>}
            {
                pageList.map( item => <p key = {item} className = {activePage == item ? "active" : ""} onClick = {() => handlePageClick(item)}>
                    {item}
                </p>)
            }
            {hasNextPage && <p className = "next" onClick = {handleNextClick}>&#62;</p>}

        </div>
    )
}