import React from 'react';
import './LoginSignup.css';

const Signup = () => {
    return (
        <div className="form-container">
            <div className="form-box">
                <h2>Sign Up</h2>
                <form>
                    <label>Username</label>
                    <input type="text" placeholder="Enter your username" />

                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" />

                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" />

                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm your password" />

                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
