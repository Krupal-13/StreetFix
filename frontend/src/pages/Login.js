import React, { useState } from 'react';
import './LoginSignup.css';

const Login = () => {
    return (
        <div className="form-container">
            <div className="form-box">
                <h2>Login</h2>
                <form>
                    <label>Username</label>
                    <input type="text" placeholder="Enter your username" />

                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" />

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
