import React from "react";
import "./Login.css";
import 'boxicons/css/boxicons.min.css';
function Login(props) {

    const handleSubmit = (event) => {
    event.preventDefault();
 
    props.onLogin();
    
  };

  return (
    <>
    <section class="container forms">
      <div class="form login">
      <div class="form-content">
        <header>LogIn</header>
        <form action="#">
          <div class="field input-field">
            <input type="email" placeholder="Email" class="input"></input>
          </div>

          <div class="field input-field">
            <input type="password" placeholder="Password" class="input"></input>
            <i class='bx bx-hide eye-icon'></i>
            <div class="form-link">
          <a href="#" class="login-link">Forgot password?</a>
        </div>
          </div>

          <div class = "field button-field">
            <button>LogIn</button>

          </div>
        </form>
        <div class="form-link">
          <span> Already have an account?<a href="#" class="login-link">Signup</a></span>
        </div>

      </div>	
            <div class="line"></div>		
            <div class="media-options">
              <a href="#" class="field facebook">
              <i class='bx bxl-facebook facebook-icon'></i>
              <span>Login with Facebook</span>
              </a>
            </div>
            <div class="media-options">
              <a href="#" class="field google">
              <img src="Images/google.png" alt="" class="google-img" />
              <span>Login with Google</span>
              </a>
            </div>

      </div>
        
        
     
        
    <div class="form signup">
      <div class="form-content">
        <header>Signup</header>
        <form action="#">
          <div class="field input-field">
            <input type="email" placeholder="Email" class="input"></input>
          </div>

          <div class="field input-field">
            <input type="password" placeholder="Password" class="input"></input>
            <i class='bx bx-hide eye-icon'></i>
          </div>

          <div class="field input-field">
            <input type="password" placeholder="Password" class="input"></input>
            <i class='bx bx-hide eye-icon'></i>
          </div>

          <div class = "field button-field">
            <button>SignUp</button>

          </div>
        </form>
        <div class="form-link">
          <span> Already have an account?<a href="#" class="login-link">Login</a></span>
        </div>

      </div>

    </div>
  </section>
  
  </>
  );
}
let signupBtn = document.getElementById("signupBtn");
let nameField = document.getElementById("nameField");
let title= document.getElementById("title");


export default Login;
