import React from "react";
import './Feed.css';
import { useState } from 'react';
import FilterOptions from "./Filter";
import PrimarySearchAppBar from "./ProfileBar";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CancelIcon from '@mui/icons-material/Cancel';
import Profile from "./Profile";
import ReactDOM from 'react-dom';
import SavedPost from './SavedPost.tsx'



function Feed(props) {
  // var [cards, setCards] = React.useState([]);

  //  React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/backend/rest/feed');
  //       if (response.ok) {
  //         var { cards } = await response.json(); 
  //         setCards(cards);
  //       } else {
  //         console.error('Error retrieving data:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  var cards = [
    {
      name: "Lena Rose",
      avatar: "profile.jpg",
      post: "Fox.jpg",
      likes: 50,
      tag: "Fox",
      general_tag: "Animal"
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
  const [droppedImage, setDroppedImage] = useState(null);


  console.log(searchInput);

  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  // const handleFileChange = (event) => {
  //   setImage(event.target.files[0]);
  // };
  const handleFormSubmit = (event) => {
    event.preventDefault();
  
    const imageInput = document.getElementById('file-input'); // Get the "file" input element containing the image
const file = imageInput.files[0]; // Get the image file

const fileReader = new FileReader();

fileReader.onload = function (event) {
  const base64Content = event.target.result.split(',')[1]; // Extract the base64-encoded content
  const jsonData = {
    filename: file.name,
    content: [
      {
        stream: base64Content
      }
    ]
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  };

  fetch('http://localhost:8080/backend/rest/upload', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Do something with the JSON response
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

fileReader.readAsDataURL(file);
  };
  

  function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function (event) {
      setImagePreview(event.target.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }


  const handleShowProfile = (event) => {
    ReactDOM.render(<Profile />, document.getElementById('Feed'));
  };

  const handleShowFeed = (event) => {
    ReactDOM.render(<Feed />, document.getElementById('Feed'));
  };

  const handleShowSavedPosts = (event) => {
    ReactDOM.render(<SavedPost />, document.getElementById('Feed'));
  };
  return (

    <div id="Feed">
      <>
        <nav>
          <ul>
            <li>
              <a onClick={handleShowFeed}>
                <HomeIcon
                  sx={{
                    color: 'white', marginLeft: '-240px', marginTop: '20px',
                  }}>
                </HomeIcon>
                <h6 className="text">Home</h6>
              </a>
            </li>

            <li>
              <a onClick={handleShowProfile}>
                <PersonIcon
                  sx={{
                    color: 'white', marginLeft: '-240px', marginTop: '48px',
                  }}>

                </PersonIcon>
                <h6 className="text">Profile</h6>
              </a>
            </li>
            <li>
              <a onClick={handleShowSavedPosts}>
                <BookmarkAddedIcon
                  sx={{
                    color: 'white', marginLeft: '-240px', marginTop: '48px',
                  }}>

                </BookmarkAddedIcon>
                <h6 className="text">Saved</h6>
              </a>
            </li>
            <li>
              <a href="#">
                <SettingsSuggestIcon
                  sx={{
                    color: 'white', marginLeft: '-240px', marginTop: '48px',
                  }}>

                </SettingsSuggestIcon>
                <h6 className="text" >Settings</h6>
              </a>
            </li>

            <li>
              <a href="./Login" className="logout">
                <ExitToAppIcon
                  sx={{
                    color: 'white', marginLeft: '-240px', marginTop: '10px',
                  }}>

                </ExitToAppIcon>
                <h6 className="text">Log out</h6>
              </a>
            </li>
          </ul>
        </nav>
        <div className="Search-bar">
          <PrimarySearchAppBar searchInput={searchInput} setSearchInput={setSearchInput} />
        </div>
        <div className="popup">
          <div className="wrapper">
            <button id="btn-close">
              <CancelIcon
                sx={{
                  color: '#607D8B', backgroundColor: 'white', width: '40px',
                  height: '40px',
                }}>
              </CancelIcon></button>
            <header>Drag & Drop a picture </header>
            <button id="dragdrop-btn">
              {imagePreview ? (
                <div id='image-preview'>
                <img id="imageUploaded" src={imagePreview} alt="Dropped" />
                </div>
              ) : (
                <img id="dragdrop-icon" src="cloud-upload.png" alt="Upload" />
              )}
            </button>
            <form id="form1" onSubmit={handleFormSubmit}>
              <input type="file" id="file-input" className="file-input" accept="image/*" name='image' value={image} onChange={previewImage} />
              <button id="submit1" type="submit" value="Share & Classify" >Share & Classify</button>
            </form>
            
          </div>
         

            {processedImage && (
              <div>
                <h2>Processed Image</h2>
                <img src={processedImage} alt="Processed" />
              </div>
            )}
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
                  <img className="post" src={card.post} alt="Avatar" />
                  <p className="type">{card.tag}</p>
                  <div className="barre">
                    <div>
                      <button className="button-barre">
                        <ThumbUpIcon
                          sx={{
                            color: 'white',
                          }}>
                        </ThumbUpIcon>
                      </button>
                      <h6> {card.likes} {' likes'} </h6>
                    </div>
                    <div >
                      <button className="button-barre">
                        <LoyaltyIcon
                          sx={{
                            color: 'white',
                          }}>
                        </LoyaltyIcon>
                      </button>
                      <h6>{card.tag}</h6>
                    </div>
                    <div>
                      <button className="button-barre">
                        <BookmarkAddIcon
                          sx={{
                            color: 'white',
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