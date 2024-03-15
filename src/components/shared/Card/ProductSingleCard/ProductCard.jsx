

const ProductCard = ({ item }) => {
  

    return (
        <div className="w-64 h-96 max-w-xs rounded overflow-hidden shadow-lg bg-gray-200 hover:shadow-xl transition duration-300">
            <div className="h-72 overflow-hidden">
                <img className="w-full h-full object-cover" src={item?.images[0]} alt={item.title} />
            </div>
            <div className="px-6 py-4 bg-gray-800 text-white">
                <div className="font-bold text-xl mb-2">{item.title}</div>
                <p className="text-gray-300 text-base">${item.price}</p>
            </div>
          
        </div>
    );
};

export default ProductCard;
