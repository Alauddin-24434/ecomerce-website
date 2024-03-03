import { useState } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    const categories = [
        "Mobiles",
        "Laptops",
        "Desktops",
        "Tablets",
        "Monitors",
        "TVs",
        "Cameras",
        "Audio",
        "Accessories"
    ];

    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    return (
        <div className="bg-gray-200 py-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-12">
                    <div className="col-span-3 border-r">
                        <ul className="space-y-2">
                            {categories.map((category, index) => (
                                <li key={index}>
                                    {/* Use Link component to navigate to different category pages */}
                                    <Link
                                        to={{
                                            pathname: '/category',
                                            search: `?category=${encodeURIComponent(category.toLowerCase().replace(/\s/g, '-'))}`
                                        }}
                                        className={`block px-4 py-2 rounded-md transition-colors duration-200 ${activeCategory === category ? 'bg-green-500 text-white' : 'hover:bg-gray-300'}`}
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-9">
                        {/* You can replace this with your banner content */}
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to our E-commerce Store!</h1>
                            <p className="text-lg text-gray-600">Discover the best deals on electronic products.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
