import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
import 'boxicons/css/boxicons.min.css';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import App from '../App';



function SignUp(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        props.onLogin();

    };

    const handleLogin = () => {
        setIsLoggedIn(true);
      };
    useEffect(() => {
        const pwShowHide = document.querySelectorAll(".eye-icon");

        pwShowHide.forEach((eyeIcon) => {


            eyeIcon.addEventListener("click", () => {
                console.log("Click event fired");
                let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

                pwFields.forEach((password) => {
                    if (password.type === "password") {
                        password.type = "text";
                        eyeIcon.classList.replace("bx-hide", "bx-show");
                        return;
                    }
                    password.type = "password";
                    eyeIcon.classList.replace("bx-show", "bx-hide");
                });
            });
        });
    }, []);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleGoLogin = (event) => {
        const rootElement = document.getElementById('container forms');
        ReactDOM.createRoot(rootElement).render(<App />);

    };

    return (
        <>
            <section id="container forms" class="container forms">




                <div class="form signup">
                    <div class="form-content">
                        <header>Signup</header>
                        <form action="#">
                            <TextField sx={{ width: "100%", }} id="outlined-basic" label="email" variant="outlined" />
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
                            <div class="field button-field">
                                <button>SignUp</button>

                            </div>
                        </form>
                        <div class="form-link">
                            <br />
                            <span> Already have an account ?</span>
                        </div>

                        <div class="field button-field">
                            <button onClick={handleGoLogin} >Login</button>

                        </div>
                    </div>



                </div>

            </section>
        </>
    );
}
let signupBtn = document.getElementById("signupBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");


export default SignUp;
