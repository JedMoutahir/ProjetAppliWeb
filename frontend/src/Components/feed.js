import React from "react";
import './Feed.css';
import { useState } from 'react';
import FilterOptions from "./Filter";
import PrimarySearchAppBar from "./ProfileBar";
import HomeIcon from '@mui/icons-material/Home';


function Feed(props) {


  const [imagePreview, setImagePreview] = useState("");
  const [keywords, setKeywords] = useState([]);
  var cards = [
    {
      name: "Lena Rose",
      profile_picture: "profile.jpg",
      post: "Fox.jpg",
      likes: "50 likes",
      tag: "Fox",
      tag_general : "Animal"
    }, {
      name: "John Doe",
      profile_picture: "profile2.jpg",
      post: "plant.webp",
      likes: "30 likes",
      tag: "Plant",
      tag_general: "Nature"
    }, {
      name: "Alex Sabatier",
      profile_picture: "profile2.jpg",
      post: "avocat.jpg",
      likes: "3 likes",
      tag: "Avocat",
      tag_general: "Food"
    }


  ]

  function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      setImagePreview(event.target.result);
    };

    reader.readAsDataURL(file);
  }
  
  
  return (
    <>
      <nav>
        <ul>
          <li>
            <a onClick={() => props.setShowFeed(true)}>
              <img className="icon" src="maison.png" />
              <h6 className="text">Home</h6>
            </a>
          </li>

          <li>
            <a onClick={() => props.setShowProfile(true)}>
              <img className="icon" src="utilisateur.png" />
              <h6 className="text">Profile</h6>
            </a>
          </li>
          <li>
            <a onClick={() => props.setShowSavedPosts(true)}>
              <img className="icon" src="bookmark.png" />
              <h6 className="text">Saved</h6>
            </a>
          </li>
          <li>
            <a href="#">
              <img className="icon" src="gear.png" />
              <h6 className="text" >Settings</h6>
            </a>
          </li>
          <li>
            <a href="#">
              <img className="icon" src="aidez-moi.png" />
              <h6 className="text">Help</h6>
            </a>
          </li>
          <li>
            <a href="./Login" className="logout">
              <img className="icon" src="logout.png" />
              <h6 className="text">Log out</h6>
            </a>
          </li>
        </ul>
      </nav>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      
      <div className="popup">
        <div className="wrapper">
          <button id="btn-close"><img id="img-close" src="cross.png" /></button>
          <header>Drag & Drop a picture </header>
          <button id="dragdrop-btn"><img id="dragdrop-icon" src="cloud-upload.png" /></button>
          <form id="form1" action="/uploadfile" enctype="multipart/form-data" method="post">
            <input type="file" id="file-input" className="file-input" accept="image/*" onchange={previewImage} />
            <button id="submit1" type="button" >Share & Classify</button>
          </form>
          <div id="image-preview"><img src={imagePreview} /></div>
        </div>
      </div>
      <FilterOptions keywords={keywords} setKeywords={setKeywords} />

      <div className="cards">
        {
          cards.filter(card => keywords.length === 0 || keywords.includes(card.tag_general) ).map(card => {
            return (
              <div class="card">
                <div className="profile">
                  <img className="profile-pic" src={card.profile_picture} />
                  <h4 className="Name"><b>{card.name}</b></h4>
                </div>
                <img className="post" src={card.post} alt="Avatar" />
                <p className="type">{card.tag}</p>
                <div className="barre">
                  <div>
                    <button> <img src="like.png" /></button>
                    <h6>{card.likes}</h6>
                  </div>
                  <div >
                    <button><img src="categorization.png" /></button>
                    <h6>{card.tag}</h6>
                  </div>
                  <div>
                    <button><img src="bookmark.png" /></button>
                    <h6>save</h6>
                  </div>
                </div>
              </div>
            );
          })
        }

      </div>


    </>
  )
}

export default Feed