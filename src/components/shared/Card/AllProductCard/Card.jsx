import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Card = ({ product }) => {

    const navigate = useNavigate();
    // Function to render star ratings
    const renderRatingStars = () => {
        const stars = [];
        for (let i = 0; i < product.rating; i++) {
            stars.push(<FaStar key={i} className="text-yellow-500" />);
        }
        return stars;
    };



    const handleProductDetails = (id) => {
        navigate(`/details/${id}`);
    };

    return (
        <div onClick={() => handleProductDetails(product?._id)} className="max-w-xs  rounded h-96 bg-slate-200 overflow-hidden shadow-2xl">
            <img className="w-full h-48" src={product.images[0]} alt={product.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.title}</div>
                <p className="text-gray-700 text-base">${product.price}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <div className="flex items-center">
                    {renderRatingStars()}
                </div>
            </div>
        </div>
    );
};

export default Card;
