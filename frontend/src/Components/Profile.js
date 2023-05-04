import * as React from 'react';
import './Profile.css';
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



function Profile(props) {
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
      <h1 className="name">{user.name}</h1>
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
      maxWidth: 1150,
      height: 'auto',
      marginLeft:'50px',
      marginTop:'40px',
      transform: 'translateZ(0)',
    }}>
      
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
              </IconButton>
            }
          />
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
    <BottomNavigation sx={{ width: 1000 ,backgroundColor: 'transparent'}} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
        sx={{ color: 'black' }}
      />
      <BottomNavigationAction
        label={`${user.followers} followers`}
        value="Followers"
        icon={<PeopleAltIcon />}
        sx={{ color: 'black' }}
      />
      <BottomNavigationAction
        label={`${user.posts} posts`}
        value="Posts"
        icon={<DynamicFeedIcon />}
        sx={{ color: 'black' }}
        
      />

      <BottomNavigationAction label="Edit profile" value="Edit profile" icon={<EditIcon />} sx={{ color: 'black' }} />
    </BottomNavigation>
  );
}


const user = {
  name: "Jane Doe",
  username: "janedoe",
  bio: "Software engineer and sport lover",
  avatar: "https://i.pravatar.cc/150?img=11",
  followers: 1000,
  following: 500,
  posts: 12,
};


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    cols: 2,
  },
];

