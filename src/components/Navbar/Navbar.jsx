import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri'; // Icon for dropdown arrow

const Navbar = () => {
    const [showCategories, setShowCategories] = useState(false);

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    return (
        <nav className="navbar flex justify-between items-center bg-[#01A49E] hover:bg-[#008B8B] border border-[#FFFFFF] text-white p-4">
            <div className="navbar-left">
                <div className="categories-dropdown relative">
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
            </div>
            <div className="navbar-right">
                <Link to="/login" className="mr-4"><AiOutlineLogin /></Link>
                <Link to="/signup"><AiOutlineUserAdd /></Link>
            </div>
        </nav>
    );
};

export default Navbar;
