import React from "react";
import './Login.css'
const loginpage = () =>  {
    return (
      <><div >
            <img id ="Image" src="ImageLogin.png" />
        </div>
        <div className="login-box">
                <p id="title-login">Login</p>
                <hr id="underline"></hr>
                <form action="/" method="post">
                    <div className="user-box">
                        <input type="text" name="username" className="input-field" placeholder="Username" />
                        <hr></hr>
                    </div>
                    <div className="user-box">
                        <input type="password" name="password" className="input-field" placeholder="Password" />
                        <hr></hr>
                    </div>
                    <p id="forgotpsw">Forgot password?</p>
                    <button id="login"><strong id="LOGIN">LOGIN</strong></button>

                </form>
            </div></> 
    )
}

export default loginpage