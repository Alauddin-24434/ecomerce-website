/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importing icons from react-icons

// Define a mapping between color names and their corresponding codes
const colorCodes = {
    "Golden": "#FFD700",
    "White": "#FFFFFF",
    "Red": "#FF0000",
    "Blue": "#0000FF",
    "Green": "#008000",
    "Yellow": "#FFFF00",
    "Black": "#000000",
    "Purple": "#800080", 
    "Silver": "#C0C0C0",
    "Orange": "#FFA500"
};


const ProductDetailsSection = ({ images, title, price, brand, quantity, handleSubtraction, handleAddition, handleBuy, _id, colors }) => {
    const [mainImage, setMainImage] = useState(images?.[0]);
    const [filteredColors, setFilteredColors] = useState([]);
    const [error, setError] = useState('');

    const handleImageHover = (image) => {
        setMainImage(image);
    };

    // Custom Next arrow component
    const NextArrow = (props) => {
        const { className, onClick } = props;
        return <div className={className} onClick={onClick}><FaChevronRight /></div>;
    };

    // Custom Prev arrow component
    const PrevArrow = (props) => {
        const { className, onClick } = props;
        return <div className={className} onClick={onClick}><FaChevronLeft /></div>;
    };

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />, // Using custom Next arrow component
        prevArrow: <PrevArrow />, // Using custom Prev arrow component
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const handleFilter = (selectedColor) => {
        // Reset the error state when a color is selected
        setError('');

        if (filteredColors.includes(selectedColor)) {
            setFilteredColors(filteredColors.filter(color => color !== selectedColor));
        } else {
            setFilteredColors([...filteredColors, selectedColor]);
        }
    };

    const handleBuyNow = () => {
        if (filteredColors.length === 0) {
            setError('Please select a color');
        } else {
            handleBuy(_id, quantity, filteredColors);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when the component mounts
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Image Box */}
            <div className="w-full lg:w-1/3">
                {/* Main Image */}
                <div className="w-full mb-4 bg-white" >
                    <img src={mainImage} alt="Main Product" className="w-full p-8 h-full object-cover rounded-lg shadow-lg" />
                </div>

                {/* Additional Images Carousel */}
                <div className="hidden lg:block">
                    <Slider {...sliderSettings}>
                        {images?.map((image, index) => (
                            <div key={index} className="w-full  h-40">
                                <img
                                    src={image}
                                    alt={`image-${index}`}
                                    className="w-full h-full p-3 object-cover shadow-md mb-2 rounded-lg cursor-pointer"
                                    onMouseEnter={() => handleImageHover(image)}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            {/* Product Details */}
            <div className="w-full lg:w-1/2 lg:ml-4">
                <div className="bg-gray-100 rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <hr className="border-gray-300" />
                    <div className="flex flex-col mb-4">
                        <div>
                            <p className="text-lg font-bold mb-2 " style={{color:"golden"}}>Price:</p>
                            <p className="text-lg text-green-600 font-bold">${price}</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold mb-2 text-gray-700">Family Color:</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {colors.map((color, index) => (
                                    <div key={index} className={`w-4 h-4 rounded-full cursor-pointer ${filteredColors.includes(color) ? 'opacity-50' : ''}`} style={{ backgroundColor: color === "Golden" ? "#FFD700" : colorCodes[color] }} onClick={() => handleFilter(color)}></div>
                                ))}
                            </div>

                        </div>
                        <div>
                            <p className="text-lg font-bold mb-2 text-gray-700">Brand:</p>
                            <p className="text-lg text-blue-600 font-bold">{brand}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center border border-gray-300 gap-2 py-1 px-2 rounded-lg">
                            <button className="bg-gray-200 text-gray-700 rounded-lg px-2" onClick={handleSubtraction}>-</button>
                            <p className="text-lg font-bold text-gray-700">{quantity}</p>
                            <button className="bg-gray-200 text-gray-700 rounded-lg px-2" onClick={handleAddition}>+</button>
                        </div>
                        <div className="flex w-full max-w-xs gap-2 border border-gray-300 py-1">
                            <button onClick={handleBuyNow} className="flex-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 px-4 py-2">Buy Now</button>
                            <button className="flex-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 px-4 py-2">Add to Cart</button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-700">Free Shipping</p>
                            <p className="text-sm text-gray-700">30-day Returns</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-700">Secure Payment</p>
                            <p className="text-sm text-gray-700">Customer Support</p>
                        </div>
                    </div>
                </div>


                {/* Additional Images Carousel for smaller screens */}
                <div className="lg:hidden w-full mt-4">
                    <Slider {...sliderSettings}>
                        {images?.map((image, index) => (
                            <div key={index} className="w-full h-32">
                                <img
                                    src={image}
                                    alt={`image-${index}`}
                                    className="w-full h-full object-cover rounded-lg shadow-md mb-2 border border-gray-200 cursor-pointer"
                                    onMouseEnter={() => handleImageHover(image)}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsSection;
