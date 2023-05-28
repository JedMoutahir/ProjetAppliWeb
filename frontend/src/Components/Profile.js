import * as React from 'react';
import './Profile.css';
import { Tooltip } from '@mui/material';
import List from '@mui/material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import BottomAppBar from './notifications';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import CancelIcon from '@mui/icons-material/Cancel';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ReactDOM from 'react-dom';
import SavedPost from './SavedPost.tsx';
import Feed from './feed';


function Profile(props) {

  var [user, setUser] = React.useState(null);
  var [UserPosts, setUserPosts] = React.useState([]);

 

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const id_user = parseInt(localStorage.getItem('userId'), 10);
        console.log( JSON.stringify({ id_user }));
        const response = await fetch('http://localhost:8080/backend/rest/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_user }),

        }).then(response => response.json())
        //return the user's id in the response
        .then(jsonResponse => {
        const user = jsonResponse.user;
        const UserPosts = jsonResponse.posts;
        console.log(user);
        setUser(user);
        setUserPosts(UserPosts);
        console.log(UserPosts);
       })
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowProfile = () => {
    ReactDOM.render(<Profile />, document.getElementById('Feed'));
   };

   const handleShowFeed = () => {
    ReactDOM.render(<Feed />, document.getElementById('Feed'));
   }; 

   const handleShowSavedPosts = () => {
    ReactDOM.render(<SavedPost />, document.getElementById('Feed'));
   };
   const [value, setValue] = React.useState('recents');
   const [AvatarPreview, setAvatarPreview] = React.useState("");
 
   const handleChange = (event, newValue) => {
     setValue(newValue);
   };
  
   function previewAvatar(event) {
     const file = event.target.files[0];
     const reader = new FileReader();
 
     reader.onloadend = function (event) {
       setAvatarPreview(event.target.result);
     };
     if (file) {
       reader.readAsDataURL(file);
     } else {
       setAvatarPreview(null);
     }
   }
 
   function changeAvatar() {
     /*to display the popup*/
     const Edit = document.querySelector('#EditIcon');
     const popup = document.querySelector('.popupAvatar');
         Edit.addEventListener('click', () => {
         popup.style.display = 'flex';
         });
         
     /**to remove the popup */
     const close = document.querySelector('#btn-close');
     const pop = document.querySelector('.popupAvatar');
         close.addEventListener('click', () => {
             pop.style.display = 'none';
         });
 }
 
 const handleChangeSubmit = (event) => {
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
 
     fetch('http://localhost:8080/backend/rest/changeAvatar', requestOptions)
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
    const change = document.querySelector('#change');
    const popup = document.querySelector('.popupAvatar');
    change.addEventListener('click', () => {
        popup.style.display = 'none';
        });
 };

 const handleDelete = async (idpost) =>  {
  // Make a request to the server to update the likes of the post
  const id_user = parseInt(localStorage.getItem('userId'), 10);
  const id_post = parseInt(idpost, 10);
  const response = await fetch('http://localhost:8080/backend/rest/unpost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_user,id_post}),
  }).then(response => response.json())
  //return the user's id in the response
    .then(jsonresponse => {
      console.log(jsonresponse);
      if (jsonresponse.success === true) {
        console.log("post deleted successfully")
       }
    })
    .catch(error => {
      console.error('Error deleting post:', error);
    });
};

const showFollowers = (event)  => {
  const show = document.querySelector('#showFollowers');
  const popup = document.querySelector('.popupFollowers');
  show.addEventListener('click', () => {
      popup.style.display = 'flex';
      });
}

  return (
    < > 
    <div className="Allprofile">
    <nav>
        <ul>
          <li>
            <a onClick={handleShowFeed}>
              <HomeIcon 
              sx ={{
                color:'white', marginLeft :'-240px', marginTop :'20px',
                }}>

              </HomeIcon>
              <h6 className="text">Home</h6>
            </a>
          </li>

          <li>
            <a onClick={handleShowProfile}>
            <PersonIcon 
              sx ={{
                color:'white', marginLeft :'-240px', marginTop :'40px',
                }}>

              </PersonIcon>
              <h6 className="text">Profile</h6>
            </a>
          </li>
          <li>
            <a onClick={handleShowSavedPosts}>
            <BookmarkAddedIcon 
              sx ={{
                color:'white', marginLeft :'-240px', marginTop :'40px',
                }}>

              </BookmarkAddedIcon>
              <h6 className="text">Saved</h6>
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
      <BottomAppBar sx={{marginLeft:'300px',}}></BottomAppBar>
    <div className='Profile'>
    <div className="user-profile">
      <ul>
      <h1 className="name"> {user && `${user.username} `}</h1>
      <p className="name"> </p>
      </ul>
      <ul>
      <img src= {user && `data:image/png;base64,${user.avatar}`} className="avatar" />
      </ul>
      <ul className="stats">
      <BottomNavigation sx={{ width: 370 ,backgroundColor: 'transparent',marginTop:'-30%'}} value={value} onChange={handleChange}>
//       <BottomNavigationAction
        id='showFollowers'
        label={user && `${user.followers} followers`}
        value="Followers"
        icon={<PeopleAltIcon />}
        sx={{ color: 'white' ,}}
        onClick={showFollowers}
      />
      <BottomNavigationAction
        label={user && `${user.post_count} posts`}
        value="Posts"
        icon={<DynamicFeedIcon />}
        sx={{ color: 'white' }}
        
      />
      <BottomNavigationAction id ='EditIcon' label="Edit profile" value="Edit profile" icon={<EditIcon />} onClick={changeAvatar} sx={{ color: 'white' }} />
    </BottomNavigation>
    </ul>
    </div>
    <ul>
    <List className ='popupFollowers'
      sx={{
        display:'none',
        width: '100%',
        maxWidth: 360,
        marginLeft:'-50%',
        marginTop:'-20%',
        bgcolor: '#E0E0E0',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >       <ul>
            { user && user.following_list && user.following_list.map(follower => (
              
              <ListItem key={`${follower.username} `}>
                <img className='follower' src={user && `data:image/png;base64,${follower.avatar}`}/> &nbsp;
                <ListItemText primary={`   ${follower.username} is following you`} />
              </ListItem>
            ))}
            </ul>
      
    </List>
    </ul>

    <div className="popupAvatar">
          <div className="wrapperAvatar">
            <button id="btn-close">
              <CancelIcon
                sx={{
                  color: '#607D8B', backgroundColor: 'white', width: '40px',
                  height: '40px',
                }}>
              </CancelIcon></button>
            <header>Drag & Drop your new avatar </header>
            <button id="dragdrop-btn">
                <div id='image-preview'>
                {AvatarPreview ? (
                <div id='image-preview'>
                  <img id="imageUploaded" src={AvatarPreview} alt="Dropped" />
                </div>
              ) : (
                <img id="dragdrop-icon" src="cloud-upload.png" alt="Upload" />
              )}                
              </div>
             
            </button>
            <form id="form1" onSubmit={handleChangeSubmit}>
              <input type="file" id="file-input" className="file-input" accept="image/*" name='image' onChange={previewAvatar} />
              <button id="change" type="submit" value="Change avatar" > Change avatar</button>
            </form>
          </div>
    </div>
    
      <br></br>
      <div className ="ListImages">
    <ImageList sx={{
      width: '90%',
      maxWidth: 1000,
      height: 'auto',
      marginLeft:'35px',
      marginTop:'40px',
      transform: 'translateZ(0)',
    }}>
      
      {UserPosts.map((item) => (
        <ImageListItem key={item.image}>
          <img
            src={`data:image/png;base64,${item.image}`}
            alt={item.title}
            loading="lazy"
          />
         <ImageListItemBar
        title={item.general_tag}
        subtitle={item.author}
        actionIcon={
          <>
          <Tooltip title={`${item.likes}`} placement="top">
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${item.title}`}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          
          {/* Add the delete icon */}
          <Tooltip title="Delete" placement="top">
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label="delete"
              onClick={() => handleDelete(item.id_post)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      }
    >
    </ImageListItemBar>
  
    </ImageListItem>
      ))}
    </ImageList>
    </div>
    </div>
    </div>
</>
    )
}

export default Profile







