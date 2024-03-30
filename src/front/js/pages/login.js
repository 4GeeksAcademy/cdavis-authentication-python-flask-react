import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="container">
            <h2>Login</h2>
            <form>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
    );
};

export default Login;
