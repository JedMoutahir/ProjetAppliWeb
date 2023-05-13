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

  var cards = [
    {
      name: "Lena Rose",
      avatar: "profile.jpg",
      post: "Fox.jpg",
      likes: 50,
      tag: "Fox",
      general_tag : "Animal"
    }, {
      name: "John Doe",
      avatar: "profile2.jpg",
      post: "plant.webp",
      likes: 30,
      tag: "Plant",
      general_tag: "Nature"
    }, {
      name: "Alex Sabatier",
      avatar: "profile2.jpg",
      post: "avocat.jpg",
      likes: 3,
      tag: "Avocat",
      general_tag: "Food"
    }
  ]

  const [imagePreview, setImagePreview] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [searchInput, setSearchInput] = React.useState('');

  console.log(searchInput);

  function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      setImagePreview(event.target.result);
    };

    reader.readAsDataURL(file);
  }
  return (
    
    <div className ="Feed">
    
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
      <PrimarySearchAppBar searchInput={searchInput} setSearchInput={setSearchInput}/>
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
          <form id="form1" action="/uploadfile" encType="multipart/form-data" method="post">
            <input type="file" id="file-input" className="file-input" accept="image/*" onChange={previewImage} />
            <button id="submit1" type="button" >Share & Classify</button>
          </form>
          <div id="image-preview"><img src={imagePreview} /></div>
        </div>
      </div>
      <FilterOptions keywords={keywords} setKeywords={setKeywords} />

      <div className="cards">
        
        {
          cards.filter(card => (keywords.length === 0 || keywords.includes(card.general_tag)) && card.name.toLowerCase().includes(searchInput.toLowerCase())).map(card => {
            

            return (
              <div className="card">
                <div className="profile">
                  <img className="profile-pic" src={card.avatar} />
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
                    <h6> {card.likes} {' likes'} </h6>
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
  </div>
  )
      
}

export default Feed