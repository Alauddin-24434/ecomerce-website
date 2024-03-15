import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Comments from '../../components/shared/Comments/Comments';

const ProductDetailsPage = () => {
    const navigate = useNavigate()
    const loadProperty = useLoaderData();
    const { title, _id, brand, images, price, } = loadProperty || {};


    const [selectedTab, setSelectedTab] = useState('customerFeedback');
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
    if (selectedTab === 'customerFeedback') {
        middleSectionContent = <div>





            <Comments  productId={_id} />

        </div>;
    } else if (selectedTab === 'description') {
        middleSectionContent = <div>Description details will go here.</div>;
    }

    const handleBuy = (id, count) => {
        console.log(id, count);
        navigate(`/purchase/${id}?count=${count}`);
    };


    return (
        <div>
            {/* details top section */}
            <div className="flex flex-col h-auto  lg:flex-row">
                {/* Image Box */}
                <div className="w-full lg:w-1/2">
                    {/* Main Image */}
                    <div className="w-full mb-4" style={{ height: '400px' }}>
                        <img src={images[0]} alt="Main Product" className="w-full h-full object-cover rounded-lg shadow-lg" />
                    </div>
                    {/* Additional Images Carousel */}
                    <div className="hidden lg:block">
                        <Slider {...sliderSettings}>
                            {images.map((image, index) => (
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
                        <h1 className="text-3xl font-bold mb-4">{title}</h1>

                        <hr />
                        <div>
                            <p className="text-lg font-bold mb-2">Price: ${price}</p>
                            <p className="text-lg font-bold mb-2">Brand: {brand}</p>

                        </div>
                        <div>

                            <div className='flex items-center gap-4'>
                                <span className='flex items-center border gap-6 py-1 px-6 rounded-lg'>
                                    <button className='bg-gray-400 rounded-lg px-2' onClick={handleSubtraction}>-</button>
                                    <p>{quantity}</p>
                                    <button className='bg-gray-400 rounded-lg px-2' onClick={handleAddition}>+</button>
                                </span>
                                <div className='flex w-full gap-2 border py-1'>
                                    <button onClick={() => handleBuy(_id, quantity)} className='flex-1 border'>Buy Now</button>
                                    <button className='flex-1 border'>Add to Cart</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* Additional Images Carousel for smaller screens */}
                    <div className="lg:hidden w-full mt-4">
                        <Slider {...sliderSettings}>
                            {images.map((image, index) => (
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
                    <li onClick={() => handleTabClick('customerFeedback')}>Customer feedback</li>
                    <li onClick={() => handleTabClick('description')}>Descriptions</li>


                </ul>
                <div className='h-screen'>
                    {/* customerFeedback details */}
                    {selectedTab === 'customerFeedback' && <div>{middleSectionContent}</div>}
                    {/* description details */}
                    {selectedTab === 'description' && <div>{middleSectionContent}</div>}


                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
