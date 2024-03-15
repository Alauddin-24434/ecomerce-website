import { useEffect, useState } from "react";
import Card from "../../../components/shared/Card/AllProductCard/Card";


const JustForYou = () => {
    const [allProductData, setAllProductData] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`http://localhost:5000/item`);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                // Filter the data here before setting it in the state

                setAllProductData(data);
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };

        fetchCategories();
    }, [allProductData]);

    return (
        <div>
            <h2 className="my-4 text-2xl">Just For You</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:grid-cols-6 2xl:grid-cols-7">
                {

                    allProductData?.map((product) =>

                        <Card key={product._id}  product={product} />

                    )
                }
            </div>
        </div>
    );
};

export default JustForYou;