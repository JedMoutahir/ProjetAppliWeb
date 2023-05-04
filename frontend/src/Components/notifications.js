import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';

const messages = [
  {
    id: 1,
    primary: 'Lena Rose',
    secondary: "Liked your picture",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 2,
    primary: 'Rachida oussakel',
    secondary: "Liked your picture",
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 3,
    primary: 'Charifi yasmine',
    secondary: "Liked your picture",
    person: '/static/images/avatar/2.jpg',
  },
  {
    id: 4,
    primary: 'Jed moutahir',
    secondary: "Liked your picture",
    person: '/static/images/avatar/3.jpg',
  },
  {
    id: 5,
    primary: "Steven",
    secondary: "Liked your picture",
        person: '/static/images/avatar/4.jpg',
  },
  {
    id: 6,
    primary: "It's me",
    secondary: "Liked your picture",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 7,
    primary: 'Summer BBQ',
    secondary: "Liked your picture",
    person: '/static/images/avatar/1.jpg',
  },
];


export default function BottomAppBar() {
  return (
    <React.Fragment >
      <CssBaseline/>
    
<Paper square sx={{ pb: '50px' , width :'30%',marginLeft:'70%',marginTop:'1%' }}>
<ListSubheader sx={{ bgcolor: '#607D8B', fontSize: '24px',width:'353px' ,}}>
  Notifications
</ListSubheader>


  <Box sx={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'scroll' ,}}>
    <List sx={{ mb: 2 ,bgcolor:'#607D8B ',}}>
      {messages.map(({ id, primary, secondary, person }) => (
        <React.Fragment key={id}>
          {id === 1 && (
            <ListSubheader sx={{ bgcolor: '#9E9E9E' }}>
              Today
            </ListSubheader>
          )}

          {id === 3 && (
            <ListSubheader sx={{ bgcolor: '#9E9E9E' }}>
              Yesterday
            </ListSubheader>
          )}

          <ListItem button>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  </Box>
</Paper>
    </React.Fragment>
  );
}
