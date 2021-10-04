import React, { useState ,useEffect} from 'react'
import './Homepage.css'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Posts from '../Components/Posts'
import axios from 'axios'
import { useLocation } from 'react-router'

function Homepage() {
    const [posts,setPosts]=useState([]);
    //Destructuring search query from path location
const {search} =useLocation();
console.log(search);


    useEffect(() => {
        
        const fetchPosts=async()=>{
const res=await axios.get("/posts"+search); //"http://localhost:5000/posts"
// console.log(res.data);
setPosts(res.data);//updating array without sq bracket
        };
        fetchPosts();//calling function to fire Effect
        
    }, [search])//fire useEffect when query changes
    return (
        <>
        <Header/>
        <div className="homepage">
        
        <Posts posts={posts} />
            <Sidebar/>
            
        </div>
        </>
    )
}

export default Homepage
