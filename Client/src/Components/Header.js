import React from 'react'
import './Header.css'
import headImg from '../Images/trvl-hmpg.jpg'
function Header() {
    return (
        <div className="header">
        <div className="headerTitles">
            {/* <span className="headerTitlesm">MERN</span>
            <span className="headerTitlelg">Blog</span> */}
       
            </div>
       <img src={headImg} alt="img" className="headerImg" />
        </div>
    )
}

export default Header
