import React from 'react';
import ReactDOM from 'react-dom';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SignUp from './signup.js';
import Feed from './feed.js';


function Login(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/backend/rest/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password}),
    }).then(response => response.json())
    //return the user's id in the response
      .then(jsonresponse => {
        if (jsonresponse.success === true) {
          e.preventDefault();
         // props.onLogin();
          const rootElement = document.getElementById('container forms');
          ReactDOM.createRoot(rootElement).render(<Feed />);
          localStorage.setItem('userId', jsonresponse.id);
          const idType = typeof jsonresponse.id;
          console.log(idType);
        }
      })
      .catch(error => { console.error("error", error) });
  }

 

  const handleSignUp = (event) => {
    const rootElement = document.getElementById('container forms');
    ReactDOM.createRoot(rootElement).render(<SignUp />);

  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (

    <>
    
      <section id="container forms" className="container forms">
        <div className="form login">
          <div className="form-content">
           <header id='loginHeader'>Login</header>
           <form action="#">
              <TextField sx={{
                width: "100%",
              }}
                id="outlined-basic"
                label="username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormControl sx={{ marginTop: "5px", width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <div className="field button-field ">
                <button onClick={handleSubmit} id='buttonLogin'>LogIn</button>
              </div>
            </form>
            <div className="form-link">
              <br />
              <span> Don't have an account yet?</span>
            </div>
            <div className="field button-field ">
              <button onClick={handleSignUp} id='buttonLogin'>SignUp</button>
            </div>
          </div>
         
        </div>
        <div className="image-container" >
          <img className ='imagebackground' src="login_light_mode.jpg"  alt="Image" />
          </div>
      </section>

    </>
  );
}


export default Login;
