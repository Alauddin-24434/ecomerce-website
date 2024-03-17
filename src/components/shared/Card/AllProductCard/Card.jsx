/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom';
const Card = ({ product }) => {





    const navigate = useNavigate();
    const rating = Math.floor(Math.floor() * (5 - 1 + 1)) + 1;

    // Function to generate star icons based on rating
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<span key={i} className="text-yellow-400">&#9733;</span>);
        }
        for (let i = rating; i < 5; i++) {
            stars.push(<span key={i} className="text-gray-300">&#9733;</span>);
        }
        return stars;
    };

    // Calculate discounted price
    const discountedPrice = product.price - product.discount;
    const handleProductDetails = (id) => {
        navigate(`/details/${id}`);
    };
    return (
        <div onClick={() => handleProductDetails(product?._id)} className="max-w-full cursor-pointer lg:w-48 h-80  rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300 flex flex-col justify-center items-center">
            <div className="h-56 overflow-hidden">
                <img className="w-auto h-full transition-transform duration-300 transform" src={product?.images[0]} alt={product.title} />
            </div>
            <hr className="border-t border-gray-200 my-2 w-full" />

            <div className="px-2 py-2">
                <div className="text-xs mb-1">{product.title}</div>
                <p className="text-[#01A49E] text-base font-bold">
                    <span className="mr-2">${discountedPrice.toFixed(2)}</span>
                    {product.discount > 0 && (
                        <span className="text-gray-400 text-xs line-through mr-2">${product.price}</span>
                    )}
                    <span className='text-red-400 text-xs'>{product.discount}% off</span>
                </p>
                <div className="flex items-center">
                    <div className="text-yellow-400">{renderStars()}</div>
                </div>
            </div>
        </div>
    );
};

export default Card;
