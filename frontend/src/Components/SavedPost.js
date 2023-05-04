import * as React from 'react';
import './Profile.css';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function SavedPosts(props) {
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
</>
    )
};

export default SavedPosts