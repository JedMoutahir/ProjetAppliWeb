import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
import 'boxicons/css/boxicons.min.css';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import { RadioGroup, FormControlLabel,FormLabel  } from '@mui/material';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    const handleBirthDateChange = useCallback((date) => {
        setBirthDate(date);
      }, []);

    

    const [showPassword, setShowPassword] = React.useState(false);
    const [birthDate, setBirthDate] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);

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
                           
                            
                            <TextField sx={{ marginTop: "5px", width: "100%", }} id="outlined-basic" label="email" variant="outlined" />
                            <TextField sx={{ width: "100%", marginTop: "5px" }} id="outlined-basic" label="username" variant="outlined" />
                            
                            <DatePicker
                                sx={{ marginTop: "5px", width: "100%", }}
                                id="birth-date"
                                selected={birthDate}
                                onChange={handleBirthDateChange}
                                dateFormat="dd/MM/yyyy"
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={100}
                                placeholderText="Select your birth date"
                                withPortal={true}
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

                            <FormControl sx={{ marginTop: "5px", width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPasswordConfirm ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPasswordConfirm}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password"
                                />
                            </FormControl>
                            <FormControl sx={{ marginTop: "5px"}} variant="outlined">
                                <FormLabel sx={{ marginTop: "5px" }} id="demo-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                row
                                >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                 </RadioGroup>
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
