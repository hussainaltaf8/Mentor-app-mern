import React from 'react'
import './Settings.css'
import Sidebar from '../Components/Sidebar';
import prof from '../Images/profile-avatar.jpg'
import { useContext, useState } from "react";
import { Context } from "../Context/Context";
import axios from "axios";


function Settings() {

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

//using data from context api
  const { user, dispatch } = useContext(Context);
  
  const PF = "/images/"; //"http://localhost:5000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    //starting the update
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,//config
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      //sending filename and file to data
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        //uploading photo
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      //updating data
      const res = await axios.put("/users/" + user._id, updatedUser);
      //After updating data, Want to show message
      setSuccess(true);
      //if update successful, then send data to payload
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      //if error, then update failure
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

    return (
        <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsTitleUpdate">Update Your Account</span>
            <span className="settingsTitleDelete">Delete Account</span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
          <label className="PPtitle">Profile Picture</label>
            <div className="settingsPP">
           
              <img
              //if file is just uploaded, convert it into url and use this
              //else use the user profile pic from public folder 
                src={file ? URL.createObjectURL(file) : PF+user.profilePic}
               alt="profile"
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>{" "}
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                className="settingsPPInput"
                //files[0]-->Bcz we are using single pic
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <label>Username</label>
            <input type="text" 
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
             />

            <label>Email</label>
            <input type="email"
             placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}/>

            <label>Password</label>
            <input type="password" 
            
            onChange={(e) => setPassword(e.target.value)}
             />

            <button className="settingsSubmitButton"
             type="submit">
              Update
            </button>
{/* if profile updation is successful  */}
            {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}

          </form>
        </div>
        <Sidebar />
      </div>
    )
}

export default Settings;
