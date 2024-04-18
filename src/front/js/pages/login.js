import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [formError, setFormError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            setFormError(true);
            setErrorMessage("Incorrect credentials");
            return;
        }

        setFormError(false);

        const loginResult = await actions.login(email, password);
        if (!loginResult.success) {
            setFormError(true);
            setErrorMessage(loginResult.error);
            return;
        }

        navigate("/"); 
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {formError && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
    );
};

export default Login;
