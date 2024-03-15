import { useLoaderData, useSearchParams } from "react-router-dom";


const PurchasePage = () => {
    const loaderData = useLoaderData();
    const {_id, title,category, brand, price } = loaderData || {};

    // Access the count parameter from the URL
    const searchParams = useSearchParams()[0];
    const count = searchParams.get("count");
    const userInfo={
        userName:"Alauddin",
        email:"alauddin@gmail.com"
    }

    // Calculate the total price based on the count
    const totalPrice = (parseFloat(price) * parseInt(count)).toFixed(2);


    const handlePayNow = () => {
        // Call your backend server to initiate the payment process
        fetch('http://localhost:5000/order', {
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
                email: userInfo?.email
            })
        })
        .then((res) =>  res.json())
        .then((result)=>{
            // console.log(result.url)
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
                    <p className="text-gray-600">Price per item: ${price}</p>
                    <p className="text-gray-600">Total Price: ${totalPrice}</p>

                  

                    <div className="mt-4">
                        {/* Payment button */}
                        <button onClick={handlePayNow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchasePage;
