import { useContext} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import './Login.css'; // Import CSS file for additional styling
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from "sweetalert2";





const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userLogin } = useContext(AuthContext);

    const handleSignIn = async (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        userLogin(email, password)
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: "User login successfully!",
                    icon: 'success',
                })
                setTimeout(() => {
                    navigate(location?.state ? location.state : '/'), 10
                }, "1500");
            })
            .catch(() => {
                Swal.fire({
                    title: 'Error!',
                    text: "Password doesn't match!",
                    icon: 'error',
                })
            });
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-image">
                    <img src="https://i.ibb.co/5GVzPzt/signup.png" alt="Login" />
                </div>
                <div className="login-form">
                    <h2>Login</h2>
                    <form className="login-form-fields" onSubmit={handleSignIn}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"

                                placeholder="example@gmail.com"
                                className="input-field"

                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"

                                placeholder="*****"
                                className="input-field"

                            />
                        </div>

                        <button type="submit" className="login-button">Login</button>
                    </form>
                    {/* Add a link to the signup page */}
                    <div className="mt-4 text-center">
                        <p>
                            Do not have an account?{' '}
                            <Link to="/signup" className="text-blue-500">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
