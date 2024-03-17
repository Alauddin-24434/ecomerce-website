import  { useState } from 'react';
import './Login.css'; // Import CSS file for additional styling
import axios from 'axios';

const Login = () => {
    // State variables to store form data and error message
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    // Event handler to update form data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email: formData.email,
                password: formData.password
            });

            // Check the status code of the response
            if (response.status === 200) {
                // Login successful
                const { token } = response.data;
                localStorage.setItem('token', token); // Save token in localStorage
                setError(''); // Clear any previous error
                // Redirect or perform other actions for successful login
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle any errors, such as displaying an error message to the user
            if (error.response && error.response.data && error.response.data.message) {
                // If there is an error message from the server, display it
                setError(error.response.data.message);
            } else if (error.response && error.response.status === 400) {
                // Handle specific status code errors
                setError('Invalid email or password');
            } else {
                // If there is no specific error message, set a generic error
                setError('Login failed');
            }
        }
    };

    // Event handler to handle logout
    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        // Perform any additional logout actions, such as redirecting to the login page
    };

    // Render the login form
    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-image">
                    <img src="/src/assets/images/signup.png" alt="Login" />
                </div>
                <div className="login-form">
                    <h2>Login</h2>
                    <form className="login-form-fields" onSubmit={handleSubmit}>
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
                        {/* Display error message */}
                        {error && <p className="error-message ">{error}</p>}
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    {/* Render the logout button */}
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
