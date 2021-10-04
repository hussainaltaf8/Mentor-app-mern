import React, { useEffect, useState,useContext } from 'react'
import './SinglePost.css'
import {useLocation,Link} from "react-router-dom"
import axios from 'axios';
import { Context } from "../Context/Context";


function SinglePost() {
    const location=useLocation();
    // splitting array on slash and taking 2nd index element
    const path= location.pathname.split('/')[2];

    const [post,setPost]=useState({});
    const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost=async ()=>{
            //fetch data from backend with this url,
            //path is id destructured above by useLocation()
const res= await axios.get("/posts/"+path) //"http://localhost:5000/posts/"
setPost(res.data);
setTitle(res.data.title);
setDesc(res.data.desc);
        }
        getPost();//calling function to fire useEffect
        
    }, [path])//whenever path changes,fire useEffect

    //creating public folder to use images
    const PF = "/images/"; //"http://localhost:5000/images/"
    const { user } = useContext(Context);

    //deleting single post
    const handleDelete = async () => {
        try {
          await axios.delete(`/posts/${post._id}`, {
           //configure with username before deleting
            data: { username: user.username },
          });
          //back to homepage after deleting
          window.location.replace("/");
        } catch (err) {}
      };

      //editing singlepost
      const handleUpdate = async () => {
        try {
          await axios.put(`/posts/${post._id}`, {
            username: user.username,//config
            title,//updated data
            desc,//updated data
          });
          setUpdateMode(false)
        } catch (err) {}
      };

    return (
        <div className="singlePost">
            <div className="singlepostWrapper">
            {/* if post has photo, then use it */}
            {post.photo && <img src={PF + post.photo}
                alt="image" 
                    className="singlePostImg"
                /> }
{/* //if in editin mode, then show input tag
else show h1 tag */}
{updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
                
                <h1 className="singlePostTitle">
                    {title}

                    {post.username === user?.username && (
                    <div className="singlePostEdit">
                    <i className="singlePostIcon far fa-edit"
                    onClick={() => setUpdateMode(true)}
                    ></i>
                    <i className="singlePostIcon fas fa-trash-alt"
                    onClick={handleDelete}
                    ></i>
                    </div>
                    )}
                </h1>
        )}
                <div className="singlePostInfo">
          <span className="singlePostAuthor1">
            Author:
            {/* Route to given query
            show posts only from this user on posts page
            OR Homepage= to={`/?user=${post.username}`}*/}
            <Link to={`/posts/?user=${post.username}`} className="link">

            
            <b className="singlePostAuthor2">
              
                {post.username}
              
            </b>
            </Link>
          </span>
          <span className="singlePostDate"> {new Date(post.createdAt).toDateString()}</span>
        </div>
<div className="text-button">
{/* //if in editing mode,then show text area,
else show fetched desc from backend */}
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
        <p className="singlePostDesc">
         {desc}
        </p>
        )}
      
      {/* //only show button if in updated mode */}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}

        </div>
            </div>

        </div>
    )
}

export default SinglePost
