import { useState } from 'react';


import { useLoaderData, useNavigate, } from 'react-router-dom';

import ProductDetailsSection from './ProductDetailsSection/ProductDetailsSection';

const ProductDetailsPage = () => {

    const loadProperty = useLoaderData();
    const { title, _id, brand, images, price, colors } = loadProperty || {};

    const navigate = useNavigate()
    const [selectedTab, setSelectedTab] = useState('customerFeedback');
    const [quantity, setQuantity] = useState(1);



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



            Description details will go here.


        </div>;
    } else if (selectedTab === 'description') {
        middleSectionContent = <div>Description details will go here.</div>;
    }



    const handleBuy = (id, count, colors) => {
        console.log(id, count, colors);
        navigate(`/purchase/${id}?count=${count}&colors=${colors}`);
    };



    return (
        <div className='max-w-7xl mx-auto'>
            {/* details top section */}
            <ProductDetailsSection
                images={images}
                colors={colors}
                title={title}
                price={price}
                brand={brand}
                quantity={quantity}
                handleSubtraction={handleSubtraction}
                handleAddition={handleAddition}
                handleBuy={handleBuy}
                _id={_id}
            />
            <hr />
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
