import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';

const CategoryPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const decodedCategory = decodeURIComponent(category);

    const categoryData = {
        "mobiles": [
            {
                "id": 1,
                "brand": "Apple",
                "name": "iPhone 13",
                "description": "A powerful smartphone with the latest features.",
                "image": "https://via.placeholder.com/150",
                "price": 999.99,
                "rating": 4.5,
                "color": "black"
            },
            {
                "id": 2,
                "brand": "Samsung",
                "name": "Galaxy S21",
                "description": "A sleek and stylish smartphone with advanced technology.",
                "image": "https://via.placeholder.com/150",
                "price": 899.99,
                "rating": 4.3,
                "color": "white"
            }
        ],
        "laptops": [
            {
                "id": 3,
                "brand": "Apple",
                "name": "MacBook Pro",
                "description": "A high-performance laptop with a stunning display.",
                "image": "https://via.placeholder.com/150",
                "price": 1499.99,
                "rating": 4.8,
                "color": "silver"
            },
            {
                "id": 4,
                "brand": "Dell",
                "name": "XPS 13",
                "description": "An ultra-portable laptop with exceptional build quality.",
                "image": "https://via.placeholder.com/150",
                "price": 1299.99,
                "rating": 4.6,
                "color": "black"
            }
        ],
        "tvs": [
            {
                "id": 5,
                "brand": "Samsung",
                "name": "QLED Q90T",
                "description": "A premium 4K QLED TV with vibrant colors and impressive contrast.",
                "image": "https://via.placeholder.com/150",
                "price": 1999.99,
                "rating": 4.7,
                "color": "black"
            },
            {
                "id": 6,
                "brand": "LG",
                "name": "OLED C1",
                "description": "An OLED TV with perfect blacks and infinite contrast.",
                "image": "https://via.placeholder.com/150",
                "price": 2499.99,
                "rating": 4.9,
                "color": "silver"
            }
        ]
    };

    const currentCategoryData = categoryData[decodedCategory];
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [brandFilter, setBrandFilter] = useState([]);
    const [colorFilter, setColorFilter] = useState([]);

    const brands = Array.from(new Set(currentCategoryData.map(item => item.brand)));
    const colors = Array.from(new Set(currentCategoryData.map(item => item.color)));

    const filteredData = currentCategoryData.filter(item => {
        const meetsMinPrice = minPrice === '' || item.price >= parseFloat(minPrice);
        const meetsMaxPrice = maxPrice === '' || item.price <= parseFloat(maxPrice);
        const meetsBrandFilter = brandFilter.length === 0 || brandFilter.includes(item.brand.toLowerCase());
        const meetsColorFilter = colorFilter.length === 0 || colorFilter.includes(item.color.toLowerCase());
        return meetsMinPrice && meetsMaxPrice && meetsBrandFilter && meetsColorFilter;
    });

    const clearFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setBrandFilter([]);
        setColorFilter([]);
    };

    return (
        <div className="flex">
            <div className="w-1/4 p-4">
                {/* Filters */}
                <h2 className="text-lg font-bold mb-4">Brands</h2>
                <select
                    multiple
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(Array.from(e.target.selectedOptions, option => option.value.toLowerCase()))}
                    className="block w-full border rounded p-2 mb-4"
                >
                    {brands.map((brand, index) => (
                        <option key={index} value={brand.toLowerCase()}>{brand}</option>
                    ))}
                </select>

                <h2 className="text-lg font-bold mb-4">Colors</h2>
                <select
                    multiple
                    value={colorFilter}
                    onChange={(e) => setColorFilter(Array.from(e.target.selectedOptions, option => option.value.toLowerCase()))}
                    className="block w-full border rounded p-2 mb-4"
                >
                    {colors.map((color, index) => (
                        <option key={index} value={color.toLowerCase()}>{color}</option>
                    ))}
                </select>

                <div>
                    <h2 className="text-lg font-bold mb-4">Price Range</h2>
                    <input
                        type="text"
                        placeholder="Minimum Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="mb-2 p-2 block w-full border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Maximum Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="mb-2 p-2 block w-full border rounded"
                    />
                </div>

                {brandFilter.length > 0 || colorFilter.length > 0 || minPrice || maxPrice ? (
                    <button onClick={clearFilters} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-2">Clear All</button>
                ) : null}
            </div>

            <div className="w-3/4 p-4">
                {/* Display filtered items */}
                <div className="flex flex-wrap justify-center gap-4">
                    {filteredData?.map((item, index) => (
                        <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg transition duration-300 hover:shadow-2xl cursor-pointer">
                            <img className="w-full" src={item.image} alt={item.name} />
                            <div className="px-6 py-4">
                                <p className="font-semibold text-lg mb-2">{item.brand}</p>
                                <p className="font-bold text-xl mb-2">{item.name}</p>
                                <p className="text-gray-700 text-base">{item.description}</p>
                                <p className="text-gray-900 font-bold text-xl mt-2">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                                    <FaCartPlus />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
