import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Banner = () => {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [error, setError] = useState(null);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories');
               
                const categoriesData = await response.json();
                setCategories(categoriesData);
                setError(null);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to fetch categories. Please try again later.');
            }
        };

        fetchCategories();
    }, []);

    // Custom previous arrow component
    

 
    // Settings for the slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
     
    };

    return (
        <div className="border p-4 lg:p-0 h-full my-4">
            <div className="container mx-auto max-w-screen-xl">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-3 border">
                        <ul className="space-y-2">
                            {error ? (
                                <li>{error}</li>
                            ) : (
                                categories.length > 0 && categories.map((category, index) => (
                                    <li key={index}>
                                        <Link
                                            to={{
                                                pathname: '/category',
                                                search: `?category=${encodeURIComponent(category.toLowerCase().replace(/\s/g, '-'))}`
                                            }}
                                            className={`block px-4 py-3 transition-colors duration-200 ${activeCategory === category ? 'bg-green-500 text-white' : 'hover:bg-[#01A49E]'}`}
                                            onClick={() => handleCategoryClick(category)}
                                            style={{ lineHeight: '1.5' }}
                                        >
                                            {category}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div className="col-span-12 md:col-span-9 border">
                        <div className="text-center">
                            <Slider {...settings}>
                                <div>
                                    <img src="/src/assets/images/banner1.jpg" alt="Image 1" />
                                </div>
                                <div>
                                    <img src="/src/assets/images/banner2.jpg" alt="Image 2" />
                                </div>
                                <div>
                                    <img src="/src/assets/images/banner3.jpg" alt="Image 3" />
                                </div>
                                {/* Add more image slides as needed */}
                            </Slider>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
