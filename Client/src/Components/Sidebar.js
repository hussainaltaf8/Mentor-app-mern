import axios from 'axios';
import React,{useState,useEffect} from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom';


function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
       const getCats=async ()=>{
const res =await axios.get("/categories")   //http://localhost:5000/categories
console.log(res.data);
setCats(res.data);
       }
        getCats();
    }, []);

    return (
        <div className="sidebar">
           <div className="sidebarItem">
<span className="sidebarTitle">ABOUT ME</span>
            <img className="sideImg" src="https://www.growthmentor.com/blog/wp-content/uploads/2019/01/how-to-be-a-good-mentor.png" alt="about" />
           <p>
           I want to help the hardworking people to work in right direction.
           The main motive behind this project is to help the people to learn and grow with guidance and life-experience of another person.


           </p>
           </div>

           <div className="sidebarItem">
<span className="sidebarTitle">CATEGORIES</span>
<ul className="sideBarList">
{
    cats.map((cat)=>(
        //Route to this query search
        <Link to={`/posts?cat=${cat.name}`} className="link">
        <li className="sideBarListItem">{cat.name}</li>
        </Link>
       
    ))
}



    
</ul>
           <div className="sidebarItem">
<span className="sidebarTitle">FOLLOW US</span>
            <div className="sideBarSocial">
           <a href="https://www.instagram.com/hussainmdaltaf_8/"
             target="_blank" 
             className="link"
             >
            <i className="sideBarIcon fab fa-instagram"></i>
            </a>

            <a href="https://github.com/hussainaltaf8/"
             target="_blank" 
             className="link"
             >
           <i className="sideBarIcon fab fa-github"></i>
           </a>

           <a href="https://www.linkedin.com/in/hussainmdaltaf8/"
             target="_blank" 
             className="link"
             >
           <i className="sideBarIcon  fab fa-linkedin"></i>
           </a>
            </div>
           </div>
           </div>
        </div>
    )
}

export default Sidebar
