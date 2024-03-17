import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Create styles for the PDF document
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        position: 'relative',
    },
    header: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        textDecoration: 'underline',
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    watermark: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.2,
    },
});

const Success = () => {
    const { tranId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/ordered?transactionId=${tranId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product data");
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            } finally {
                setLoading(false); // Set loading to false when fetch completes
            }
        };

        fetchData();
    }, [tranId]);

    // Function to handle PDF download
    const downloadPDF = async () => {
        const doc = (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Image style={styles.watermark} src="/src/assets/images/watermark.png" />
                        <Text style={styles.header}>Payment Receipt</Text>
                        <Text style={styles.text}>Thank you for your purchase!</Text>
                        <Text style={styles.text}>Transaction ID: {tranId}</Text>
                        {product && (
                            <View>
                                <Text style={styles.header}>{product.name}</Text>
                                <Text style={styles.text}>Total Price: ${product.totalPrice}</Text>
                                <Text style={styles.text}>{product.title}</Text>
                                <Text style={styles.text}>City: {product.city}</Text>
                                <Text style={styles.text}>Address: {product.address}</Text>
                                <Text style={styles.text}>Zipcode: {product.zipCode}</Text>
                                <Text style={styles.text}>Date: {new Date(product.createdAt).toLocaleString()}</Text>
                                <Text style={styles.text}>User Name: {product.userName}</Text>
                                <Text style={styles.text}>Email: {product.email}</Text>
                            </View>
                        )}
                    </View>
                </Page>
            </Document>
        );

        const pdfBlob = await pdf(doc).toBlob();
        saveAs(pdfBlob, 'payment_receipt.pdf');
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-r from-purple-600 to-indigo-800 flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden relative"
            >
                <div className="p-4 md:p-6">
                    <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-center text-gray-800">Payment Receipt</h2>
                    <p className="text-base md:text-lg text-center text-gray-700 mb-4">Thank you for your purchase!</p>
                    <p className="text-base md:text-lg text-center text-gray-700 mb-4">Transaction ID: {tranId}</p>

                    {!loading && product && ( // Conditionally render based on loading state and product data
                        <div className="mt-4 md:mt-6">
                            <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-center text-gray-800">{product.name}</h3>
                            <p className="text-base md:text-lg text-center text-gray-700 mb-1 md:mb-2">Total Price: ${product.totalPrice}</p>
                            <p className="text-base md:text-lg text-center text-gray-700">{product.title}</p>
                            <p className="text-base md:text-lg text-center text-gray-700">City: {product.city}</p>
                            <p className="text-base md:text-lg text-center text-gray-700">Address: {product.address}</p>
                            <p className="text-base md:text-lg text-center text-gray-700">Zipcode: {product.zipCode}</p>
                            <p className="text-base md:text-lg text-center text-gray-700">Date: {new Date(product.createdAt).toLocaleString()}</p>
                            <p className="text-base md:text-lg text-center text-gray-700">User Name: {product.userName}</p>
                            <p className="text-base md:text-lg text-center text-gray-700">Email: {product.email}</p>
                        </div>
                    )}
                    <div className="flex justify-center mt-6">
                        <button onClick={downloadPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Download Receipt PDF
                        </button>
                    </div>
                </div>
            </motion.div>
            <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120, delay: 1 }}
                className="absolute bottom-0 right-0 w-24 md:w-48 h-auto"
                src="/src/assets/images/ballon.svg"
                alt="Balloons"
            />
        </div>
    );
};

export default Success;
