import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import './Login.css'; // Import CSS file for additional styling

import { AuthContext } from '../../Provider/AuthProvider';
import useUser from '../../hooks/useUser';

const Login = () => {
    const { login, error } = useContext(AuthContext);
    const { refetch } = useUser();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = formData.email;
        const password = formData.password;
        await login(email, password);
        refetch();
        const isLocation = localStorage.getItem("prevLocation");
        navigate(isLocation || '/', { replace: true });
        localStorage.removeItem("prevLocation");
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-image">
                    <img src="/src/assets/images/signup.png" alt="Login" />
                </div>
                <div className="login-form">
                    <h2>Login</h2>
                    <form className="login-form-fields" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                placeholder="example@gmail.com"
                                className="input-field"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                placeholder="*****"
                                className="input-field"
                                onChange={handleInputChange}
                            />
                        </div>
                        {error && <p className="error-message ">{error}</p>}
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    {/* Add a link to the signup page */}
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
