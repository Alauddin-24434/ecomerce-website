import { useLoaderData, useSearchParams } from "react-router-dom";

// Define color codes
const colorCodes = {
    "Golden": "#FFD700",
    "White": "#FFFFFF",
    "Red": "#FF0000",
    "Blue": "#0000FF",
    "Green": "#008000",
    "Yellow": "#FFFF00",
    "Black": "#000000"
};

const PurchasePage = () => {
    const loaderData = useLoaderData();
    const { _id, title, category, brand, price } = loaderData || {};

    // Access the count parameter from the URL
    const searchParams = useSearchParams()[0];
    const count = searchParams.get("count");
    const colors = searchParams.get("colors");
    const userInfo = {
        userName: "Alauddin",
        email: "alauddin@gmail.com"
    }
    const userOtherInfo={
        city:"Barisal",
        address:"Mongolhata",
        zipCode:"8200"
    }
    // Calculate the total price based on the count
    const totalPrice = (parseFloat(price) * parseInt(count)).toFixed(2);

    // Convert colors string to an array
    const colorsArray = colors ? colors.split(",") : [];
    console.log(colorsArray)
    const handlePayNow = () => {
        // Call your backend server to initiate the payment process
        fetch('https://ecommerce-server-beta.vercel.app/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                title,
                brand,
                category,
                price,
                count,
                totalPrice,
                productId: _id,
                userName: userInfo?.userName,
                email: userInfo?.email,
                colorsArray,
                city:userOtherInfo.city,
                address:userOtherInfo.address,
                zipCode:userOtherInfo.zipCode,
                

            })
        })
            .then((res) => res.json())
            .then((result) => {
                // Redirect to the payment URL
                window.location.replace(result.url)
            })
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48" src="https://via.placeholder.com/150" alt={title} />
                </div>
                <div className="p-8">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className="text-gray-600">Brand: {brand}</p>
                    <p className="text-gray-600">Count: {count}</p>
                    <p className="text-gray-600">Colors: {colorsArray.map((colorName, index) => (
                        <span key={index} style={{ display: 'inline-block', marginRight: '0.5rem' }}>
                            <span style={{ backgroundColor: colorCodes[colorName], width: '1.5rem', height: '1.5rem', display: 'inline-block', borderRadius: '50%', marginRight: '0.5rem' }}></span>

                        </span>
                    ))}</p>
                    <p className="text-gray-600">Price per item: ${price}</p>
                    <p className="text-gray-600">Total Price: ${totalPrice}</p>
                    <div className="mt-4">
                        {/* Payment button */}
                        <button onClick={handlePayNow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Pay Now SSL
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchasePage;
