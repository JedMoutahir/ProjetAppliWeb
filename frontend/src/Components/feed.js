import React from "react";
import './Feed.css';
import { useState } from 'react';
import FilterOptions from "./Filter";
import PrimarySearchAppBar from "./ProfileBar";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CancelIcon from '@mui/icons-material/Cancel';


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
              <HomeIcon 
              sx ={{
                color:'white', marginLeft :'-240px', marginTop :'20px',
                }}>

              </HomeIcon>
              <h6 className="text">Home</h6>
            </a>
          </li>

          <li>
            <a onClick={() => props.setShowProfile(true)}>
            <PersonIcon 
              sx ={{
                color:'white', marginLeft :'-240px', marginTop :'40px',
                }}>

              </PersonIcon>
              <h6 className="text">Profile</h6>
            </a>
          </li>
          <li>
            <a onClick={() => props.setShowSavedPosts(true)}>
            <BookmarkAddedIcon 
              sx ={{
                color:'white', marginLeft :'-240px', marginTop :'40px',
                }}>

              </BookmarkAddedIcon>
              <h6 className="text">Saved</h6>
            </a>
          </li>
          <li>
            <a href="#">
            <SettingsSuggestIcon 
              sx ={{
                color:'white', marginLeft :'-240px', marginTop :'40px',
                }}>

              </SettingsSuggestIcon> 
              <h6 className="text" >Settings</h6>
            </a>
          </li>
          <li>
            <a href="#">
            <InfoIcon 
              sx ={{
                color:'white', marginLeft :'-240px', marginTop :'40px',
                }}>

              </InfoIcon>
             <h6 className="text">Help</h6>
            </a>
          </li>
          <li>
            <a href="./Login" className="logout">
            <ExitToAppIcon 
              sx ={{
                color:'white', marginLeft :'-240px', marginTop :'10px',
                }}>

              </ExitToAppIcon>
              <h6 className="text">Log out</h6>
            </a>
          </li>
        </ul>
      </nav>
      <div className = "Search-bar">
      <PrimarySearchAppBar></PrimarySearchAppBar>
      </div>
      <div className="popup">
        <div className="wrapper">
          <button id="btn-close">
            <CancelIcon 
          sx={{color :'#607D8B',backgroundColor:'white', width:'40px',
              height:'40px',}}>
            </CancelIcon></button>
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
                <img className="post" src={card.post} alt="Avatar"/>
                <p className="type">{card.tag}</p>
                <div className="barre">
                  <div>
                  <button className="button-barre">
                    <ThumbUpIcon 
                    sx ={{
                      color:'white', 
                      }}>
                     </ThumbUpIcon>
                     </button>
                    <h6>{card.likes}</h6>
                  </div>
                  <div >
                    <button className="button-barre">
                  <LoyaltyIcon
                  sx ={{
                    color:'white',  
                    }}>
                  </LoyaltyIcon>
                  </button>
                      <h6>{card.tag}</h6>
                  </div>
                  <div>
                  <button className="button-barre">
                     <BookmarkAddIcon 
                     sx ={{
                      color:'white', 
                    }}>

                    </BookmarkAddIcon>
                    </button>
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