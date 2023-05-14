import React from 'react';
import ReactDOM from 'react-dom';
import 'boxicons/css/boxicons.min.css';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SignUp from './signup.js';


function Login(props) {

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onLogin();

  };

  const handleSignUp = (event) => {
    const rootElement = document.getElementById('container forms');
    ReactDOM.createRoot(rootElement).render(<SignUp />);

  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <section id="container forms" className="container forms">
         <div className="form login">
          <div className="form-content">
            <header id ='loginHeader'>Login</header>
            <form  action="#">
              <TextField sx={{
                width: "100%",
              }}
                id="outlined-basic"
                label="username"
                variant="outlined"
              />
              <FormControl sx={{ marginTop: "5px", width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
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
                <button onClick={handleSubmit}>LogIn</button>

              </div>
            </form>
            <div className="form-link">
              <br />
              <span> Don't have an account yet?</span>
            </div>
            <div className="field button-field ">
              <button onClick={handleSignUp}>SignUp</button>

            </div>
          </div>

        </div>
</section>

    </>
  );
}


export default Login;
