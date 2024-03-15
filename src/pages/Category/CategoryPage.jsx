import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/shared/Card/ProductSingleCard/ProductCard';

const CategoryPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const decodedCategory = decodeURIComponent(category);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`http://localhost:5000/item`);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                // Filter the data here before setting it in the state
                const categoryFilter = data.filter(item => item.category.toLowerCase() === decodedCategory.toLowerCase());
                setCategories(categoryFilter);
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };

        fetchCategories();
    }, [decodedCategory]);

    const statikColorFilter = [
        "white", "black", "red", "golden", "blue", "green", "yellow", "purple", "pink", "orange",
        "cyan", "magenta", "teal", "lavender", "maroon", "navy", "olive", "gray", "silver", "brown"
    ];

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [brandFilter, setBrandFilter] = useState([]);
    const [colorFilter, setColorFilter] = useState([]);
    const colors = Array.from(new Set(categories.flatMap(item => item.colors)));
    const brands = Array.from(new Set(categories?.map(item => item.brand)));
    const filteredColors = colors.filter(color => statikColorFilter.includes(color.toLowerCase()));

    const filteredData = categories.filter(item => {
        const meetsMinPrice = minPrice === '' || item.price >= parseFloat(minPrice);
        const meetsMaxPrice = maxPrice === '' || item.price <= parseFloat(maxPrice);
        const meetsBrandFilter = brandFilter.length === 0 || brandFilter.includes(item.brand.toLowerCase());
        const meetsColorFilter = colorFilter.length === 0 || item.colors.some(color => colorFilter.includes(color.toLowerCase()));

        return meetsMinPrice && meetsMaxPrice && meetsBrandFilter && meetsColorFilter;
    });

    const clearFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setBrandFilter([]);
        setColorFilter([]);
    };

    const handleProductDetails = (id) => {
        navigate(`/details/${id}`);
    };

    return (
        <section className='max-w-7xl mx-auto'>
            <div className="flex">
                <div className="w-1/5 p-4">
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
                        onChange={(e) => setColorFilter(Array.from(e.target.selectedOptions, option => String(option.value).toLowerCase()))}
                        className="block w-full border rounded p-2 mb-4"
                    >
                        {filteredColors.map((color, index) => (
                            <option key={index} value={String(color).toLowerCase()}>{color}</option>
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

                <div className="w-3/3 p-4">
                    {/* Display filtered items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
                        {filteredData?.map((item, index) => (
                            <div
                                onClick={() => handleProductDetails(item?._id)}
                                key={index}
                                className="max-w-xs rounded overflow-hidden shadow-lg transition duration-300 hover:shadow-2xl cursor-pointer"
                            >
                                <ProductCard item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default CategoryPage;
