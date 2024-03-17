import  { useState } from 'react';
import './Signup.css'; // Import CSS file for additional styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate=useNavigate()

    // State variables to store form data and error message
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            }); // Adjust the API endpoint accordingly

            // Check the status code of the response
            if (response.status === 201) {
                // Registration successful
                console.log(response.data);
                setError(''); // Clear any previous error
                // Redirect to the login page
                navigate('/login');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle any errors, such as displaying an error message to the user
            if (error.response && error.response.data && error.response.data.message) {
                // If there is an error message from the server, display it
                setError(error.response.data.message);
            } else if (error.response && error.response.status === 400) {
                // Handle specific status code errors
                setError('User already exists');
            } else {
                // If there is no specific error message, set a generic error
                setError('Registration failed');
            }
        }
    };


    return (
        <div className="signup-container">
            <div className="signup-content">
                <div className="signup-image">
                    <img src="/src/assets/images/signup.png" alt="Signup" />
                </div>
                <div className="signup-form">
                    <h2>Register</h2>
                    <form className="signup-form-fields" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                placeholder="John Doe"
                                className="input-field"
                                onChange={handleInputChange}
                            />
                        </div>
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
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                placeholder="*****"
                                className="input-field"
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* Display error message */}
                        {error && <p className="error-message ">{error}</p>}
                        {/* Add more form fields as needed */}
                        <button type="submit" className="signup-button">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
