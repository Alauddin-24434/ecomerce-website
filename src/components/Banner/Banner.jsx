import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useCategory from '../../hooks/useCategory';

const Banner = () => {
    const categoriesAll = [
        'Mobile',
        'Headphone',
        'TV',
        'Monitor',
        'Laptop',
        'Watch',
        'Tablet',
        'Camera',
        'Speaker',
        'Router',
        'Smart Home Devices',
        'Gaming Console',
    ];

    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const { data, refetch} = useCategory();

    useEffect(() => {
        if (data) {
            // Filter the categories that exist in the data
            const availableCategories = categoriesAll.filter(category => {
                return data.find(item => item.category.toLowerCase() === category.toLowerCase());
            });
            setCategories(availableCategories);
            refetch();
        }
    }, [data, refetch]);
    

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
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <Link
                                        to={{
                                            pathname: '/category',
                                            search: `?category=${encodeURIComponent(category)}`
                                        }}
                                        className={`block px-4 py-3 transition-colors duration-200 ${activeCategory === category ? 'bg-green-500 text-white' : 'hover:bg-[#01A49E]'}`}
                                        onClick={() => handleCategoryClick(category)}
                                        style={{ lineHeight: '1.5' }}
                                    >
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-12 md:col-span-9 border">
                        <div className="text-center">
                            <Slider {...settings}>
                                <div>
                                    <img src="https://i.ibb.co/d4xRc1W/banner1.jpg" alt="Image 1" />
                                </div>
                                <div>
                                    <img src="https://i.ibb.co/d4xRc1W/banner2.jpg" alt="Image 2" />
                                </div>
                                <div>
                                    <img src="https://i.ibb.co/fpmzcp1/banner3.jpg" alt="Image 3" />
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
