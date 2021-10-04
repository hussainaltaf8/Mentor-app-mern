import React , { useContext } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import image from '../Images/profile-avatar.jpg'
import { Context } from "../Context/Context";

function Navbar() {
   //fetching userdata from context
  const {user,dispatch} =  useContext(Context);
  const PF = "/images/"  //"http://localhost:5000/images/" 
  

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

    return (
        <div className="nav">
           <div className="top-left">
           <Link className="link" to="/">
           <h1>
             THE MENTOR
           </h1>
           </Link>
           </div>
           <div className="top-center">
               <ul className="topList">
                   <li className="topListItem">
                   <Link className="link" to="/">
              HOME
            </Link>
                   </li>
                   <li className="topListItem">About</li>
                   <li className="topListItem">Contact</li>
                   <li className="topListItem">
                   <Link className="link" to="/write">
              WRITE
            </Link>
                   </li>
                   <li className="topListItem" onClick={handleLogout}> 
                   {user && "LOGOUT"}
                   </li>
                  
               </ul>
           </div>
           <div className="top-right">

           {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={PF + user.profilePic}
              alt="IMG"
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
               
               <i className=" srchIcon fas fa-search"></i>
           </div>
        </div>
    )
}

export default Navbar

