import * as React from 'react';
import './Profile.css';



function SavedPosts(props) {
  return (
    <> 
  <nav>
      <ul>
       <li>
        <a onClick={() => props.setShowFeed(true)}>
        <img className="icon" src="maison.png"/>
        <h6 className="text">Home</h6>
        </a>
       </li>

       <li>
        <a onClick={() => props.setShowProfile(true)}>
        <img className="icon" src="utilisateur.png"/>
        <h6 className="text">Profile</h6>
        </a>
       </li>
       <li>
        <a onClick={() => props.setShowSavedPosts(true)}>
        <img className="icon" src="bookmark.png"/>
        <h6 className="text">Saved</h6>
        </a>
       </li>
       <li>
        <a href="#">
        <img className="icon" src="gear.png"/>
        <h6 className="text" >Settings</h6>
        </a>
       </li>
       <li>
        <a href="#">
        <img className="icon" src="aidez-moi.png" alt="icon"/>
        <h6 className="text">Help</h6>
        </a>
       </li>
       <li>
        <a href="./Login" className="logout">
        <img className="icon" src="logout.png" alt="icon"/>
        <h6 className="text">Log out</h6>
        </a>
       </li>
      </ul>
    </nav>
   
   
</>
    )
};

export default SavedPosts