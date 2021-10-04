import React from 'react'
import './Post.css'
import {Link} from "react-router-dom"

function Post({post}) {
    //creating public folder to use images
    const PF = "/images/"; //"http://localhost:5000/images/"
    return (
        <div className="post">
        {/* if photo in post array, then display it */}
        {post.photo && <img className="postImg" src={PF + post.photo} alt="Img" />}
            

            <div className="postInfo">
                <div className="postCats">
                {post.categories.map((c)=>(
                    <span className="postCat">{c.name}</span>
                ))}
                    
                    

                </div>
{/* Display SinglePage related to that props.id */}
<Link to={`/post/${post._id}`} className="link">
<span className="postTitle">
                    {post.title}

                </span>
</Link>
               

                <span className="postDate">
               {new Date (post.createdAt).toDateString()}
                </span>

                <hr />
                <p className="postDesc">
        {post.desc}
      </p>
                
            </div>
        </div>
    )
}

export default Post
