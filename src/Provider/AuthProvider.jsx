/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext,  useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    // State to store user information
  
    // State to track loading status
    const [loading, setLoading] = useState(false);
    // State to store error message
    const [error, setError] = useState('');

    // Function to handle user login
    const login = async (email, password) => {
        try {
            setLoading(true); // Set loading to true while waiting for the response
            const response = await axios.post('http://localhost:5000/api/login', {
                email: email,
                password: password
            });
            // Check the status code of the response
            if (response.status === 200) {
                // Login successful
                const { token, user } = response.data;
                localStorage.setItem('token', token); // Save token in localStorage
                localStorage.setItem('id', user._id); // Save token in localStorage
              
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
        } finally {
            setLoading(false); // Set loading to false after login attempt
        }
    };

    // Function to handle user signup
    const signup = async () => {
        try {
            // Perform signup logic here (e.g., API call)
            // Set loading to true while waiting for the response

        } catch (error) {
            // Handle signup errors (e.g., display error message)
            console.error("Signup failed:", error);
            // Set loading to false in case of error
            setLoading(false);
        }
    };

  

    // Context value containing user state and login/logout functions
    const authContextValue = {
        
       
        loading,
        error,
        login,
        signup,
     
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
