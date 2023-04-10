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

  <nav>
      <ul>
       <li>
        <a href="#">
        <img className="icon" src="maison.png"/>
        <h6 className="text">Home</h6>
        </a>
       </li>

       <li>
        <a href="#">
        <img className="icon" src="utilisateur.png"/>
        <h6 className="text">Profile</h6>
        </a>
       </li>
       <li>
        <a href="#">
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
        <img className="icon" src="aidez-moi.png"/>
        <h6 className="text">Help</h6>
        </a>
       </li>
       <li>
        <a href="#" className="logout">
        <img className="icon" src="logout.png"/>
        <h6 className="text">Log out</h6>
        </a>
       </li>
      </ul>
    </nav>
 <div className="cards">
      <div class="card">
      <div className="profile">
          <img className="profile-pic" src="profile.jpg"/>
          <h4 className="Name"><b>Lena Rose</b></h4> 
      </div> 
      <img className="post" src="Fox.jpg" alt="Avatar" />
      <div className="barre">
        <div>
        <button> <img  src="like.png" /></button>
        <h6>50 likes</h6>
        </div>
        <div >
        <button><img src="categorization.png" /></button>
        <h6>Animal: Fox</h6>
        </div>
        <div>
        <button><img src="bookmark.png" /></button>
        <h6>save</h6>
        </div>
      </div>
      </div>
    
      <div class="card">
      <div className="profile">
          <img className="profile-pic" src="profile.jpg"/>
          <h4 className="Name"><b>Lena Rose</b></h4> 
      </div> 
      <img className="post" src="ImageLogin.png" alt="Avatar" />
      <div className="barre">
        <div>
        <button><img  src="like.png" /></button>
        <h6>50 likes</h6>
        </div>
        <div >
        <button><img src="categorization.png" /></button>
        <h6>Animal: Fox</h6>
        </div>
        <div>
        <button><img src="bookmark.png" /></button>
        <h6>save</h6>
        </div>
      </div>
      </div>

      <div class="card">
      <div className="profile">
          <img className="profile-pic" src="profile.jpg"/>
          <h4 className="Name"><b>Lena Rose</b></h4> 
      </div> 
      <img className="post" src="Fox.jpg" alt="Avatar" />
      <div className="barre">
        <div>
        <button><img  src="like.png" /></button>
        <h6>50 likes</h6>
        </div>
        <div >
        <button><img src="categorization.png" /></button>
        <h6>Animal: Fox</h6>
        </div>
        <div>
        <button><img src="bookmark.png" /></button>
        <h6>save</h6>
        </div>
      </div>
      </div>

      <div class="card">
      <div className="profile">
          <img className="profile-pic" src="profile.jpg"/>
          <h4 className="Name"><b>Lena Rose</b></h4> 
      </div> 
      <img className="post" src="Fox.jpg" alt="Avatar" />
      <div className="barre">
        <div>
        <button> <img  src="like.png" /></button>
        <h6>50 likes</h6>
        </div>
        <div >
        <button><img src="categorization.png" /></button>
        <h6>Animal: Fox</h6>
        </div>
        <div>
        <button><img src="bookmark.png" /></button>
        <h6>save</h6>
        </div>
      </div>
      </div>
    
      <div class="card">
      <div className="profile">
          <img className="profile-pic" src="profile.jpg"/>
          <h4 className="Name"><b>Lena Rose</b></h4> 
      </div> 
      <img className="post" src="Fox.jpg" alt="Avatar" />
      <div className="barre">
        <div>
        <button><img  src="like.png" /></button>
        <h6>50 likes</h6>
        </div>
        <div >
        <button><img src="categorization.png" /></button>
        <h6>Animal: Fox</h6>
        </div>
        <div>
        <button><img src="bookmark.png" /></button>
        <h6>save</h6>
        </div>
      </div>
      </div>

      <div class="card">
      <div className="profile">
          <img className="profile-pic" src="profile.jpg"/>
          <h4 className="Name"><b>Lena Rose</b></h4> 
      </div> 
      <img className="post" src="ImageLogin.png" alt="Avatar" />
      <div className="barre">
        <div>
        <button><img  src="like.png" /></button>
        <h6>50 likes</h6>
        </div>
        <div >
        <button><img src="categorization.png" /></button>
        <h6>Animal: Fox</h6>
        </div>
        <div>
        <button><img src="bookmark.png" /></button>
        <h6>save</h6>
        </div>
      </div>
      </div>

  </div>

  </>
    )
}

export default Feed