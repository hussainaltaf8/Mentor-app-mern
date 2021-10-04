import React from 'react'
import './SinglePage.css'
import Sidebar from './Sidebar'
import SinglePost from './SinglePost'

function SinglePage() {
    return (
        <div className="singlepage">
            <SinglePost/>
            <Sidebar/>
        </div>
    )
}

export default SinglePage
