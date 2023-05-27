import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ReactDOM from 'react-dom';
import SavedPost from './SavedPost.tsx'
import Feed from './feed';
import Profile from './Profile.js';
import filesTheme from './theme.tsx';
import Layout from './Layout.tsx'

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="primary"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function PostExample(props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  var [savedPosts, setsavedPosts] = React.useState([]);
  var [LastPost, setLastPost] = React.useState(null);


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const id_user: number = parseInt(localStorage.getItem('userId')!, 10);
        console.log( JSON.stringify({ id_user }));
        const response = await fetch('http://localhost:8080/backend/rest/savedPosts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_user }),

        }).then(response => response.json())
        //return the user's id in the response
        .then(jsonResponse => {
        const savedPosts = jsonResponse.savedPosts;
        const LastPost = savedPosts.pop();
        console.log(savedPosts);
        setsavedPosts(savedPosts);
        setLastPost(LastPost);
        console.log(LastPost);
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

   const handleShowFeed = (event) => {
    ReactDOM.render(<Feed />, document.getElementById('Feed'));
   }; 

   const handleShowSavedPosts = () => {
    ReactDOM.render(<SavedPost />, document.getElementById('Feed'));
   };
  return (
    <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
      <CssBaseline />
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
          },
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
    <Layout.Header sx={{ backgroundColor:'transparent',width :'90%',marginLeft:'8%',display: 'absolute', }}>
      <Box sx={{ display: 'absolute', marginLeft:'95%'}}>
        <ColorSchemeToggle/>
      </Box>
    </Layout.Header>

        <nav>
        <ul>
          <li>
            <a onClick={handleShowFeed}>
              <HomeIcon 
              sx ={{
                color:'white', marginLeft :'-240px', marginTop :'20px',width :'24px', height :'24px',
                }}>

              </HomeIcon>
              <h6 className="text">Home</h6>
            </a>
          </li>

          <li>
            <a onClick={handleShowProfile}>
            <PersonIcon 
              sx ={{
                color:'white', marginLeft :'-240px', marginTop :'40px',width :'24px', height :'24px',
                }}>

              </PersonIcon>
              <h6 className="text">Profile</h6>
            </a>
          </li>
          <li>
            <a onClick={handleShowSavedPosts}>
            <BookmarkAddedIcon 
              sx ={{
                color:'white', marginLeft :'-240px', marginTop :'40px',width :'24px', height :'24px',
                }}>

              </BookmarkAddedIcon>
              <h6 className="text">Saved</h6>
            </a>
          </li>
          
          <li>
            <a href="./Login" className="logout">
            <ExitToAppIcon 
              sx ={{
                color:'white', marginLeft :'-240px', marginTop :'10px',width :'24px', height :'24px',
                }}>

              </ExitToAppIcon>
              <h6 className="text">Log out</h6>
            </a>
          </li>
        </ul>
      </nav>
        <Layout.Main>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
              gap: 2,
              marginLeft :'70%',
              marginTop:'-8%'
              
            }}
          >
            
            {savedPosts.map((item) => (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 2 }}>
             <Card
              sx={{
                '--Card-radius': (theme) => theme.vars.radius.sm,
                boxShadow: 'none',
              }}
            >
              <CardCover>
                <img
                  alt=""
                  src= {item && `data:image/png;base64,${item.image}`}
                />
              </CardCover>
              <CardCover
                sx={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.12))',
                }}
              />
              <CardContent
                sx={{
                  mt: 'auto',
                  height:'200px',
                  width :'210px',
                  flexGrow: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '80%' }}>
                  <Typography
                    level="body3"
                    mt={0.5}
                    textColor="rgba(255,255,255,0.72)"
                    sx={{ whiteSpace: 'nowrap', marginLeft: '8px' }}
                  >
                    Added on {item.date}
                  </Typography>
                </Box>

                <IconButton variant="plain" color="neutral" sx={{ color: '#fff',marginTop:'80%', marginLeft:'150%'}}>
                  <BookRoundedIcon />
                </IconButton>
              </CardContent>
            </Card>
            </Box>
            ))}
            </Box>
        </Layout.Main>
        <Sheet
          sx={{
            display: { xs: 'none', sm: 'initial' },
            borderLeft: '1px solid',
            borderColor: 'neutral.outlinedBorder',
            marginLeft:'75%',
            width :'500px',
            height :'600px',
            background:'white',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', }}>
            <Typography sx={{ flex: 1 ,color:'black'}}>Last saved post</Typography>
            <IconButton variant="outlined" color="neutral" size="sm">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', }}>
            <Button
              variant="soft"
              sx={{
                borderRadius: 0,
                borderBottom: '2px solid',
                borderColor: 'primary.solidBg',
                flex: 1,
                py: '1rem',
              }}
            >
              Details
            </Button>
            
          </Box>
          <AspectRatio ratio="21/9">
            <img
              alt=""
              src={LastPost && `data:image/png;base64,${LastPost.image}`}
            />
          </AspectRatio>
          <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center', }}>
            <Typography level="body2" mr={1} sx={{color:'black'}}>
              Saved by
            </Typography>
            <AvatarGroup size="sm" sx={{ '--Avatar-size': '24px' }}>
              <Avatar
                src="https://i.pravatar.cc/24?img=6"
                srcSet="https://i.pravatar.cc/48?img=6 2x"
              />
              <Avatar
                src="https://i.pravatar.cc/24?img=7"
                srcSet="https://i.pravatar.cc/48?img=7 2x"
              />
              <Avatar
                src="https://i.pravatar.cc/24?img=8"
                srcSet="https://i.pravatar.cc/48?img=8 2x"
              />
              <Avatar
                src="https://i.pravatar.cc/24?img=9"
                srcSet="https://i.pravatar.cc/48?img=9 2x"
              />
            </AvatarGroup>
          </Box>
          <Divider />
          <Box
            sx={{
              gap: 2,
              p: 2,
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              '& > *:nth-child(odd)': { color: 'black' },
            }}
          >
           <Typography level="body2">Tag</Typography>
            <Typography level="body2" textColor="black">
            {LastPost &&`${LastPost.general_tag}`}            </Typography>

            <Typography level="body2">Number of likes</Typography>
            <Typography level="body2" textColor="black">
            {LastPost &&`${LastPost.likes}`} 
            </Typography>

            <Typography level="body2">Created</Typography>
            <Typography level="body2" textColor="black">
            {LastPost &&`${LastPost.date}`} 
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ py: 2, px: 1 }}>
            <Button variant="plain" size="sm" endDecorator={<EditOutlinedIcon />}>
              Add a description
            </Button>
          </Box>
        </Sheet>
      </Layout.Root>
    </CssVarsProvider>
  );
}
