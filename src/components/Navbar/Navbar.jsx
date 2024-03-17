import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri'; // Icon for dropdown arrow
import { FaSearch } from 'react-icons/fa'; // Icon for search
import useUser from '../../hooks/useUser';
import { FaUser } from 'react-icons/fa';
const Navbar = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [showProfileCard, setShowProfileCard] = useState(false);
    const location = useLocation();
    const [datas, setDatas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { data, refetch } = useUser()
    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    const toggleProfileCard = () => {
        setShowProfileCard(!showProfileCard);
    };

    // Event handler to handle logout
    const handleLogout = () => {
        refetch()
        localStorage.removeItem('token');
        localStorage.removeItem('id');
    };


    useEffect(() => {
        // Define the URL of the API endpoint
        const apiUrl = 'http://localhost:5000/api/search/categories?categories=Mobile';

        // Fetch data from the API endpoint
        fetch(apiUrl)
            .then(response => {
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();
            })
            .then(data => {
                // Update the state with the fetched data
                setDatas(data);
                setLoading(false);
                setError(null);
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    // Check if the current route is the root route "/"
    const isRootRoute = location.pathname === '/';

    return (
        <nav className="navbar flex justify-between items-center bg-[#01A49E] hover:bg-[#008B8B] border border-[#FFFFFF] text-white p-4">
            {/* Navbar Logo */}
            <p>Logo</p>

            {/* Conditionally render categories dropdown only if the current route is not the root route */}
            {!isRootRoute && (
                <div className="flex items-center">
                    <div className="categories-dropdown relative mr-4">
                        <span onClick={toggleCategories} className="categories-toggle flex items-center cursor-pointer">
                            All Categories <RiArrowDropDownLine className="ml-1" />
                        </span>
                        {showCategories && (
                            <div className="text-black absolute top-full left-0 bg-white shadow-md rounded-lg z-10 py-2 px-3">
                                <ul>
                                    <li>
                                        <Link to="/vegetables" className="flex items-center">
                                            <AiOutlineUserAdd className="mr-1" /> <p>Vegetables</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/fruits" className="flex items-center">
                                            <AiOutlineUserAdd className="mr-1" /> <p>Fresh Fruits</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* Search field */}
                    <div className="search-field flex items-center bg-white text-black border border-gray-300 rounded-md px-2">
                        <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none flex-grow" />
                        <FaSearch className="text-gray-600" />
                    </div>
                </div>
            )}

            {/* Navbar right */}
            <div className="flex items-center">

                <div className="relative">
                    <div onClick={toggleProfileCard} className="cursor-pointer">
                        < FaUser className="w-7 h-7 border rounded-full" />
                    </div>
                    {showProfileCard && (
                        <div className="absolute top-10 right-0 bg-[#008B8B] text-white  shadow-md  border z-10 w-60 py-2 px-3">
                            <ul>

                                <li>
                                    <p>{data?.name}</p>
                                </li>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    {data ? <> <button onClick={handleLogout} className="logout-button">Logout</button></>
                                    :
                                    <><Link to="/login">Login</Link></>
                                }

                                </li>
                            </ul>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
