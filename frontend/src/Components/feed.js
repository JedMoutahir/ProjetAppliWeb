import React from "react";
import './Feed.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import FilterOptions from "./Filter";
import PrimarySearchAppBar from "./ProfileBar";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CancelIcon from '@mui/icons-material/Cancel';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Profile from "./Profile";
import ReactDOM from 'react-dom';
import SavedPost from './SavedPost.tsx';
import Dialog from '@mui/material/Dialog';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';


function Feed(props) {
  
  const [imagePreview, setImagePreview] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [searchInput, setSearchInput] = React.useState('');
  const [otherUser, setOtherUser] = React.useState({
    username: "Alex Sabatier",
    bio: "Software engineer and sport lover",
    avatar: "https://i.pravatar.cc/150?img=11",
    followers: 1000,
    following: 500,
    posts_count: 12,
  });
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var [cards, setCards] = React.useState([]);
   

   React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/backend/rest/listPosts');
        const jsonResponse = await response.json();
        const { posts } = jsonResponse;
        //const cards = posts;
        const cards = posts.map(post => ({
          id : post.id,
          general_tag : post.general_tag,
          likes:post.likes,
          tag :post.tag,
          post: post.post,
          user:post.user,
          filename: post.filename,
          type: post.filename.split('.')[1],
        }));
        console.log(cards);
        setCards(cards);
        console.log(cards); 
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    fetchData();
  }, []);

  
  const likePost = async (id_post) =>  {
      // Make a request to the server to update the likes of the post
      const response = await fetch('http://localhost:8080/backend/rest/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  id_post}),
      }).then(response => response.json())
      //return the user's id in the response
        .then(jsonresponse => {
          if (jsonresponse.success === true) {
            const { like_count } = jsonresponse.like_count;
           
            setCards(prevCards => {
              return prevCards.map(card => {
                if (card.id === id_post) {
                  return { id : card.id,
                    general_tag : card.general_tag,
                    likes: like_count,
                    tag : card.tag,
                    post: card.post,
                    user:card.user,
                    filename: card.filename,
                    type: card.filename.split('.')[1], };
                }
                return card;
                
         });
      });
          }
        })
        .catch(error => {
          console.error('Error updating likes:', error);
        });
   };
  

  const SavePost = async (id_post)=> {
    // Make a request to the server to update the likes of the post
    const id_user = parseInt(localStorage.getItem('userId'), 10);
    const response = await fetch('http://localhost:8080/backend/rest/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id_user, id_post}),
    }).then(response => response.json())
    //return the user's id in the response
      .then(jsonresponse => {
        if (jsonresponse.success === true) {
          console.log(jsonresponse.message);
        }
      })
      .catch(error => {
        console.error('Error updating likes:', error);
      });
  }

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
        ],
        id : parseInt(localStorage.getItem('userId'), 10)
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
          console.log(data);
         })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    fileReader.readAsDataURL(file);
      /*to remove the popup*/
      const submit = document.querySelector('#submit1');
      const popup = document.querySelector('.popup');
      submit.addEventListener('click', () => {
          popup.style.display = 'none';
          });
   };


  function LabelBottomNavigation() {
    const [value, setValue] = React.useState('recents');
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const FollowProfile = async (Id_creator)=> {
      // Make a request to the server to update the likes of the post
      const id_user = parseInt(localStorage.getItem('userId'), 10);
      const id_creator = parseInt(Id_creator, 10);
      console.log(id_creator);
      const response = await fetch('http://localhost:8080/backend/rest/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id_user, id_creator}),
      }).then(response => response.json())
      //return the user's id in the response
        .then(jsonresponse => {
          if (jsonresponse.success === true) {
            console.log(jsonresponse.message);
          }
        })
        .catch(error => {
          console.error('Error updating followers:', error);
        });
    }
    return (
      <BottomNavigation sx={{ width: 370, backgroundColor: 'transparent' }} value={value} onChange={handleChange}>
        <BottomNavigationAction
          label={`${otherUser.followers} followers`}
          value="Followers"
          icon={<PeopleAltIcon />}
          sx={{ color: 'white', }}
        />
        <BottomNavigationAction
          label={`${otherUser.posts_count} posts`}
          value="Posts"
          icon={<DynamicFeedIcon />}
          sx={{ color: 'white' }}

        />

        <BottomNavigationAction label="Follow profile" onClick={()=>FollowProfile(otherUser.id_user)} value="Follow profile" icon={<PersonAddIcon/>} sx={{ color: 'white' }} />
      </BottomNavigation>
    );
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

  const handleShowProfile = () => {
    ReactDOM.render(<Profile />, document.getElementById('Feed'));
  };

  const handleShowFeed = () => {
    ReactDOM.render(<Feed />, document.getElementById('Feed'));
  };

  const handleShowSavedPosts = () => {
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
        <div className="MyFeed">
          <FilterOptions keywords={keywords} setKeywords={setKeywords} />

          <div className="cards">

            {
              cards && cards.filter(card => (keywords.length === 0 || keywords.includes(card.general_tag)) && (card.user.username.toLowerCase().includes(searchInput.toLowerCase()) || card.general_tag.toLowerCase().includes(searchInput.toLowerCase()))).map(card => {
              return (
                  <div className="card">
                    <div className="profile" onClick={
                      () => {
                        setOtherUser(card.user);
                        handleClickOpen();
                      }
                    } 
                    value={card.user}
                    >
                      <img className="profile-pic" src={`data:image/${card.type};base64,${card.user.avatar}`} />
                      <h4 className="Name"><b>{card.user.username}</b></h4>
                    </div>
                    <img className="post" src={`data:image/${card.type};base64,${card.post}`} alt="Base64 Image" />
                    <p className="type">{card.general_tag}</p>
                    <div className="barre">
                      <div>
                        <button className="button-barre">
                          <ThumbUpIcon
                            sx={{
                              color: 'white',
                            }} onClick={() => likePost(card.id)}>
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
                        <h6>{card.general_tag}</h6>
                      </div>
                      <div>
                        <button className="button-barre">
                          <BookmarkAddIcon
                            sx={{
                              color: 'white',
                            }} onClick={() => SavePost(card.id)}>

                          </BookmarkAddIcon>
                        </button>
                        <h6>save</h6>
                      </div>
                    </div>
                  </div>
                );
              })
            }
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              PaperProps={{
                style: {
                  backgroundColor: '#9E9E9E',
                }
              }}
            >
              <div className="other-user-profile">
                
                <ul>
                  <h1 className="other-name">{otherUser.username}</h1>
                  <p className="other-bio">"I'm a new user here"</p>
                </ul>
                <ul>
                <img className="Avatar" src={otherUser && `data:image/png;base64,${otherUser.avatar}`} />
                </ul>
                <ul className="stats">
                  <LabelBottomNavigation />
                </ul>
                
              </div>
            </Dialog>
          </div>
        </div>
      </>
    </div >
  )

}

export default Feed
