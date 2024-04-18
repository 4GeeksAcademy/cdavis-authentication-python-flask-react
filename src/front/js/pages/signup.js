import React, {useState, useContext} from 'react';
import {Context} from '../store/appContext'
import { Link } from 'react-router-dom';

const Signup = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="container">
            <h2>Signup</h2>
            <form>
                <div className="form-group">
                    <label>Email address</label>
                    <input onChange={(e) => setEmail(e.target.value) } value={email} type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value) } value={password}  type="password" className="form-control" placeholder="Password" />
                </div>
                <button type="button" onClick={() => actions.signup(email,password)} className="btn btn-primary">Submit</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Signup;
