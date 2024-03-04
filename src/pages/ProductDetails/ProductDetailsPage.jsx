import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductDetailsPage = () => {
    const product = {
        "id": 3,
        "brand": "Apple",
        "name": "MacBook Pro",
        "description": "A high-performance laptop with a stunning display.",
        "image": "https://via.placeholder.com/600x400",
        "price": 1499.99,
        "rating": 4.8,
        "color": "silver",
        "multiimage": [
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150"
        ]
    };

    const [selectedTab, setSelectedTab] = useState('description');
    const [quantity, setQuantity] = useState(1);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const handleAddition = () => {
        setQuantity(quantity + 1);
    };

    const handleSubtraction = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

 

    let middleSectionContent;
    if (selectedTab === 'description') {
        middleSectionContent = <div>Description details will go here.</div>;
    } else if (selectedTab === 'customerFeedback') {
        middleSectionContent = <div>Customer feedback details will go here.</div>;
    }

    return (
        <div>
            {/* details top section */}
            <div className="flex flex-col lg:flex-row">
                {/* Image Box */}
                <div className="w-full lg:w-1/2">
                    {/* Main Image */}
                    <div className="w-full mb-4" style={{ height: '400px' }}>
                        <img src={product.image} alt="Main Product" className="w-full h-full object-cover rounded-lg shadow-lg" />
                    </div>
                    {/* Additional Images Carousel */}
                    <div className="hidden lg:block">
                        <Slider {...sliderSettings}>
                            {product.multiimage?.map((image, index) => (
                                <div key={index} className="w-full h-32">
                                    <img src={image} alt={`image-${index}`} className="w-full h-full object-cover rounded-lg shadow-md mb-2" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                {/* Product Details */}
                <div className="w-full lg:w-1/2 lg:ml-4">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                        <hr />
                        <div>
                            <p className="text-lg font-bold mb-2">Price: ${product.price.toFixed(2)}</p>
                            <p className="text-lg font-bold mb-2">Brand: {product.brand}</p>
                            <p className="text-lg font-bold mb-2">Rating: {product.rating}</p>
                        </div>
                        <div>
                        
                            <div className='flex items-center gap-4'>
                                <span className='flex items-center border gap-6 py-1 px-6 rounded-lg'>
                                    <button className='bg-gray-400 rounded-lg px-2' onClick={handleSubtraction}>-</button>
                                    <p>{quantity}</p>
                                    <button className='bg-gray-400 rounded-lg px-2' onClick={handleAddition}>+</button>
                                </span>
                               <div className='flex w-full gap-2 border py-1'>
                               <button className='flex-1 border'>Buy Now</button>
                                <button className='flex-1 border'>Add to Cart</button>
                               </div>
                            </div>
                         
                        </div>
                    </div>
                    {/* Additional Images Carousel for smaller screens */}
                    <div className="lg:hidden w-full mt-4">
                        <Slider {...sliderSettings}>
                            {product.multiimage.map((image, index) => (
                                <div key={index} className="w-full h-32">
                                    <img src={image} alt={`image-${index}`} className="w-full h-full object-cover rounded-lg shadow-md mb-2" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
            {/* details middle section */}
            <div className='flex flex-col border'>
                <ul className='flex justify-center gap-4'>
                    <li onClick={() => handleTabClick('description')}>Descriptions</li>

                    <li onClick={() => handleTabClick('customerFeedback')}>Customer feedback</li>
                </ul>
                <div className='h-screen'>
                    {/* description details */}
                    {selectedTab === 'description' && <div>{middleSectionContent}</div>}

                    {/* customerFeedback details */}
                    {selectedTab === 'customerFeedback' && <div>{middleSectionContent}</div>}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
