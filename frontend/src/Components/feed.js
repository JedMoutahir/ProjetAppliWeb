import React from "react";
import './Feed.css';


function Feed() {
    return (
     
    <>
     <div className="search-bar">
        <button id="search-button"><img id="search-img" src="magnifier.png"/></button>
        <input type="text" placeholder="Search"></input>
        <button id="panel-button"><img id="panel-img" src="panel.png"/></button>
     </div>

<div className="photos-container">
     <div className="photo-container">
         <div className="img-name">
             <img className="profile-img" src="profile.jpg"/>
             <div className="Name">
              <p>XXXXX</p>
             </div>
          </div>
          <div className="post-container">
                <img className="post-img" src="Fox.jpg"/>
          </div>
    </div>

    <div className="photo-container">
         <div className="img-name">
             <img className="profile-img" src="profile.jpg"/>
             <div className="Name">
              <p>XXXXX</p>
             </div>
          </div>
          <div className="post-container">
                <img className="post-img" src="Fox.jpg"/>
          </div>
    </div>
    </div>
    
    
  
    
    
    <div className="sidebar">
        <img id ="profile" src="camera.png"></img>
    <ul>
      <li><a href="#" className ="title-side">My profile</a></li>
      <li><a href="#" className ="title-side">Bio</a></li>
      <li><a href="#" className ="title-side">My activity</a></li>
      <li><a href="#" className ="title-side">Share a picture</a></li>
      <li><a href="#" className ="title-side">Saved pictures</a></li>
      <li><a href="#" className ="title-side">Settings &amp; privacy</a></li>
    </ul>
  </div>
  <div class="vertical-line"></div>
  <div class="search-container">
    <input type="text" placeholder="Search..."/>
    <button type="submit"><i class="fa fa-search"></i></button>
    <button type="button"><i class="fa fa-filter"></i></button>
  </div>

  </>
    )
}

export default Feed