import * as React from 'react';
import './Profile.css';
import { Tooltip } from '@mui/material';
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
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ReactDOM from 'react-dom';
import SavedPost from './SavedPost.tsx';
import Feed from './feed';


function Profile(props) {
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
    <> 
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
      <UserProfile user={user} />
      <br></br>
      <TitlebarImageList/>
    </div>
   
</>
    )
}

const UserProfile = ({ user }) => {

  return (
    <div className="user-profile">
      <ul>
      <h1 className="name">{user.username}</h1>
      <p className="bio">{user.bio}</p>
      </ul>
      <ul className="stats">
      <LabelBottomNavigation/>
      </ul>
      
      <img src={user.avatar} alt={user.name} className="avatar" />
     
    </div>
  );
};

export default Profile

function TitlebarImageList() {
  return (
    <div className ="ListImages">
    <ImageList sx={{
      width: '90%',
      maxWidth: 1000,
      height: 'auto',
      marginLeft:'35px',
      marginTop:'40px',
      transform: 'translateZ(0)',
    }}>
      
      {itemData.map((item) => (
        <ImageListItem key={item.image}>
          <img
            src={`${item.image}?w=248&fit=crop&auto=format`}
            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
         <ImageListItemBar
        title={item.title}
        subtitle={item.author}
        actionIcon={
          <Tooltip title={`${item.likes}`} placement="top">
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${item.title}`}
            >
            <FavoriteIcon />
            </IconButton>
          </Tooltip>
          
          }
          >
      </ImageListItemBar>
    </ImageListItem>
      ))}
    </ImageList>
    </div>
  );
}

function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 370 ,backgroundColor: 'transparent'}} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label={`${user.followers} followers`}
        value="Followers"
        icon={<PeopleAltIcon />}
        sx={{ color: 'white' ,}}
      />
      <BottomNavigationAction
        label={`${user.posts_count} posts`}
        value="Posts"
        icon={<DynamicFeedIcon />}
        sx={{ color: 'white' }}
        
      />

      <BottomNavigationAction label="Edit profile" value="Edit profile" icon={<EditIcon />} sx={{ color: 'white' }} />
    </BottomNavigation>
  );
}


const user = {
  username: "janedoe",
  bio: "Software engineer and sport lover",
  avatar: "https://i.pravatar.cc/150?img=11",
  followers: 1000,
  following: 500,
  posts_count: 12,
};


const itemData = [
  {
    image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    likes : '30 likes',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    likes : '60 likes',

  },
  {
    image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    likes : '8 likes',

  },
  {
    image: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    likes : '5 likes',
    cols: 2,
  },
  {
    image: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    likes : '50 likes',
    cols: 2,
  },
  {
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    likes : '50 likes',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    likes : '50 likes',

  },
  {
    image: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    likes : '50 likes',

  },
  {
    image: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    likes : '4 likes',
    rows: 2,
    cols: 2,
  },
  {
    image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    likes : '9 likes',

  },
  {
    image: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    likes : '10 likes',

  },
  {
    image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    likes : '5 likes',
    cols: 2,
  },
];

