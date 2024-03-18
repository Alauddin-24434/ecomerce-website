import { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const SignUp = () => {
    const { createUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        setSignUpError(""); // Clear previous error messages

        // Password validation function
        const isPasswordValid = (password) => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
            return regex.test(password);
        };

        // Check if the password is valid
        if (isPasswordValid(password)) {
            // Create user
            createUser(email, password)
                .then((result) => {
                    // Update user profile
                    updateProfile(result.user, {
                        displayName: name,
                    });

                    Swal.fire({
                        title: "Success!",
                        text: "User created successfully!",
                        icon: "success",
                    });

                    setTimeout(() => {
                        navigate(location?.state ? location.state : "/");
                    }, 1500);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setSignUpError(errorMessage);

                    // Display error message using SweetAlert2
                    signUpError &&
                        Swal.fire({
                            title: "Error!",
                            text: signUpError,
                            icon: "error",
                        });
                });
        } else {
            // Display password validation error using SweetAlert2
            Swal.fire({
                title: "Error!",
                text:
                    "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                icon: "error",
            });
        }
    };

    return (
        <div className="flex    items-start h-screen">
            <div className="flex justify-between items-center max-w-screen-2xl mx-auto mt-16  bg-gray-100 rounded-lg  shadow-md">
                <div className="w-1/2">
                    <img src="https://i.ibb.co/5GVzPzt/signup.png" alt="Signup" className="max-w-full h-auto" />
                </div>
                <div className="w-1/2 flex flex-col justify-center items-center">
                    <h2 className="text-2xl mb-4">Register</h2>
                    <form className="w-full" onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block font-bold text-gray-700">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                className="input-field"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-bold text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="example@gmail.com"
                                className="input-field"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block font-bold text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="*****"
                                className="input-field"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
