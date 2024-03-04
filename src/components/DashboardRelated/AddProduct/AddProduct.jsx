import  { useState } from 'react';
import app from '../../../firebase/Firebase.config';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';

const storage = getStorage(app);

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [images, setImages] = useState([]);
    const [percent, setPercent] = useState(0);
    const [colors, setColors] = useState([]);
    const categories = [
        'Mobile',
        'Headphone',
        'TV',
        'Monitor',
        'Laptop',
        'Watch',
        // Add more categories as needed
    ];
    const brands = [
        'Apple',
        'Sony',
        'Samsung',
        'LG',
        'Xiaomi',
        'Vibo',
        'Huawei',
        'Dell',
        'HP',
        'Lenovo',
        'Acer',
        'Asus',
        'Toshiba',
        'Google',
        'Microsoft',
        'Nokia',
        'OnePlus',
        'Motorola',
        'HTC',
        "No Brand"
        // Add more brands as needed
    ];
    
    const availableColors = [
        'Golden',
        'White',
        'Red',
        'Blue',
        'Green',
        'Yellow',
        'Black',
        // Add more colors as needed
    ];


    const handleColorChange = (e) => {
        const selectedColor = e.target.value;
        if (e.target.checked) {
            setColors([...colors, selectedColor]);
        } else {
            setColors(colors.filter(color => color !== selectedColor));
        }
    };

    const handleFileUpload = async (e) => {
        const { files } = e.target;

        if (!files || files.length === 0) {
            console.error('No files selected for upload');
            return;
        }

        const filesArray = Array.from(files);

        const uploadPromises = filesArray.map(async (file) => {
            const storagePath = `images/${file.name}`;
            const storageRef = ref(storage, storagePath);

            try {
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPercent(progress);
                    console.log(`Upload is ${progress}% done`);
                });

                await uploadTask;

                const downloadURL = await getDownloadURL(storageRef);
                return downloadURL;
            } catch (error) {
                console.error('Error uploading file:', error);
                toast.error('Error uploading file');
                return null;
            }
        });

        try {
            const downloadURLs = await Promise.all(uploadPromises);
            setImages((prevImages) => [...prevImages, ...downloadURLs.filter(url => url !== null)]);
        } catch (error) {
            console.error('Error uploading files:', error);
            toast.error('Error uploading files');
        }
    };

    const handleImageDragStart = (e, index) => {
        e.dataTransfer.setData('index', index.toString());
    };

    const handleImageDrop = (e, targetIndex) => {
        const startIndex = parseInt(e.dataTransfer.getData('index'));
        const updatedImages = [...images];
        const draggedImage = updatedImages[startIndex];

        updatedImages.splice(startIndex, 1);
        updatedImages.splice(targetIndex, 0, draggedImage);

        setImages(updatedImages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(brand)
        // Handle form submission
    };

    return (
        <div className="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 p-2 w-full border rounded-md">
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div className="mb-4">
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                    <select id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} className="mt-1 p-2 w-full border rounded-md">
                    <option value="">Select Brands</option>
                        {brands.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input type="text" placeholder="If any problem then simple type New Brand" onChange={(e) => setBrand(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div className="mb-4">
                    <h2>{percent}%</h2>
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images (Multiple)</label>
                    <input type="file" id="images" onChange={handleFileUpload} className="mt-1 p-2 w-full border rounded-md" multiple />
                </div>
                {images.length > 0 && (
                    <div className="mb-4">
                        <h2>Uploaded Images:</h2>
                        <div className="flex flex-wrap gap-2">
                            {images.map((imageUrl, index) => (
                                <img
                                    key={index}
                                    src={imageUrl}
                                    alt={`Uploaded Image ${index + 1}`}
                                    className="w-24 h-24 border  rounded-md object-cover m-1"
                                    draggable
                                    onDragStart={(e) => handleImageDragStart(e, index)}
                                    onDrop={(e) => handleImageDrop(e, index)}
                                    onDragOver={(e) => e.preventDefault()}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Color</label>
                    <div className="flex flex-wrap">
                        {availableColors.map((color, index) => (
                            <label key={index} className="inline-flex items-center mr-4 mb-2">
                                <input type="checkbox" value={color} onChange={handleColorChange} checked={colors.includes(color)} className="form-checkbox h-5 w-5 text-gray-600" />
                                <span className="ml-2">{color}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 p-2 w-full border rounded-md" rows="4"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div className="mb-4">
                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount</label>
                    <input type="number" id="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
