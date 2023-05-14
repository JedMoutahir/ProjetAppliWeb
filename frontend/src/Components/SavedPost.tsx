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
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import InfoIcon from '@mui/icons-material/Info';
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
            <a href="#">
            <SettingsSuggestIcon 
              sx ={{
                color:'white', marginLeft :'-240px', marginTop :'40px',width :'24px', height :'24px',
                }}>

              </SettingsSuggestIcon> 
              <h6 className="text" >Settings</h6>
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 2,
              marginLeft :'40%',
              marginTop:'-8%'
              
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                gridColumn: '1/-1',
                display: { xs: 'none', sm: 'grid' },
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                '& > *': {
                  p: 2,
                  '&:nth-child(n):not(:nth-last-child(-n+4))': {
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  },
                },
                width :'500px',
                background:'white',
              }}
            >
              <Typography level="body3" fontWeight="md" noWrap>
                Folder name
              </Typography>
              <Typography level="body3" fontWeight="md" noWrap>
                Saved on
              </Typography>
              <Typography level="body3" fontWeight="md" noWrap>
                Count
              </Typography>
              <Typography level="body3" fontWeight="md" noWrap>
                Profiles
              </Typography>
              <Typography
                level="body2"
                startDecorator={<FolderOpenIcon color="primary" />}
                sx={{ alignItems: 'flex-start' }}
              >
                Travel pictures
              </Typography>
              <Typography level="body2">21 October 2011</Typography>
              <Typography level="body2" sx={{ color: 'success.600' }}>
                9 posts
              </Typography>
              <Box>
                <AvatarGroup
                  size="sm"
                  sx={{ '--AvatarGroup-gap': '-8px', '--Avatar-size': '24px' }}
                >
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
              <Typography
                level="body2"
                startDecorator={<FolderOpenIcon color="primary" />}
                sx={{ alignItems: 'flex-start' }}
              >
                Important posts
              </Typography>
              <Typography level="body2">26 May 2010</Typography>
              <Typography level="body2" sx={{ color: 'success.600' }}>
                2 posts
              </Typography>
              <Box>
                <AvatarGroup
                  size="sm"
                  sx={{ '--AvatarGroup-gap': '-8px', '--Avatar-size': '24px' }}
                >
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
            </Sheet>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
             <Card
              sx={{
                '--Card-radius': (theme) => theme.vars.radius.sm,
                boxShadow: 'none',
              }}
            >
              <CardCover>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"
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
                <Box sx={{ flex: 1 ,marginTop:'80%'}}>
                  <Typography
                    level="body3"
                    mt={0.5}
                    textColor="rgba(255,255,255,0.72)"
                  >
                    Added 5 Aug 2016
                  </Typography>
                </Box>
                <IconButton variant="plain" color="neutral" sx={{ color: '#fff',marginTop:'80%', }}>
                  <BookRoundedIcon />
                </IconButton>
              </CardContent>
            </Card>
            <Card
              sx={{
                '--Card-radius': (theme) => theme.vars.radius.sm,
                boxShadow: 'none',
              }}
            >
              <CardCover>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"
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
                <Box sx={{ flex: 1 ,marginTop:'80%'}}>
                  <Typography
                    level="body3"
                    mt={0.5}
                    textColor="rgba(255,255,255,0.72)"
                  >
                    Added 5 Aug 2016
                  </Typography>
                </Box>
                <IconButton variant="plain" color="neutral" sx={{ color: '#fff',marginTop:'80%', }}>
                  <BookRoundedIcon />
                </IconButton>
              </CardContent>
            </Card>
            
            <Card
              sx={{
                '--Card-radius': (theme) => theme.vars.radius.sm,
                boxShadow: 'none',
              }}
            >
              <CardCover>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"
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
                <Box sx={{ flex: 1 ,marginTop:'80%'}}>
                  <Typography
                    level="body3"
                    mt={0.5}
                    textColor="rgba(255,255,255,0.72)"
                  >
                    Added 5 Aug 2016
                  </Typography>
                </Box>
                <IconButton variant="plain" color="neutral" sx={{ color: '#fff',marginTop:'80%', }}>
                  <BookRoundedIcon />
                </IconButton>
              </CardContent>
            </Card>
            </Box>
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
              src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"
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
              Nature
            </Typography>

            <Typography level="body2">Owner</Typography>
            <Typography level="body2" textColor="black">
              Michael Scott
            </Typography>

            <Typography level="body2">Created</Typography>
            <Typography level="body2" textColor="black">
              5 August 2016
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
