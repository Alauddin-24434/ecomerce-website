import { useParams } from "react-router-dom";

const Success = () => {
    const { tranId } = useParams();

    // Dummy product data for demonstration
    const product = {
        name: "Example Product",
        price: "$50.00",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan libero id erat consequat, in dictum ex malesuada."
    };

    return (
        <div className="relative h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Thank You!</h2>
                        <p className="text-lg text-center text-gray-700 mb-4">Your payment was successful!</p>
                        <p className="text-lg text-center text-gray-700 mb-4">Transaction ID: {tranId}</p>

                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">{product.name}</h3>
                            <p className="text-lg text-center text-gray-700 mb-2">Price: {product.price}</p>
                            <p className="text-lg text-center text-gray-700">{product.title}</p>
                        </div>
                    </div>
                </div>
            </div>
            <img
                className="absolute bottom-0 right-0"
                src="path_to_your_balloon_image.svg"
                alt="Balloons"
            />
        </div>
    );
};

export default Success;
