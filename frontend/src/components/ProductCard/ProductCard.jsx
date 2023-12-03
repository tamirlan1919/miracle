import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import './ProductCard.css';
import axios from 'axios';

const ProductCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products?populate=*`, {
          headers: {
            Authorization: 'Bearer ' + process.env.REACT_APP_API_TOKEN,
          },
        });

        console.log(response.data.data);
        setProducts(response.data.data); // Access the 'data' property in the response

      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchData(); // Call the fetchData function

  }, []); // Empty dependency array to run once on mount

  const isNewPrice = (product) => product.attributes.is_on_sale && product.attributes.old_price !== null;

  const calculateDisplayPrice = (product) => {
    if (isNewPrice(product)) {
      const discountPercent = ((product.attributes.old_price - product.attributes.price) / product.attributes.old_price) * 100;
      return (
        <>
          <span className="text-[20px] text-gray-800 mt-2 mr-2">
            {parseFloat(product.attributes.price).toFixed(2)}₽
          </span>
          <span className="text-[18px] text-gray-400 mt-2">
            <s>{parseFloat(product.attributes.old_price).toFixed(2)}₽</s>
            <span className="ml-2 text-red-500">-{discountPercent.toFixed(0)}%</span>
          </span>
        </>
      );
    } else {
      return (
        <span className="text-[20px] text-gray-800 mt-2 mr-2">
          {parseFloat(product.attributes.price).toFixed(2)}₽
        </span>
      );
    }
  };
  products.forEach(element => {
    console.log(element)
  });

  return (
    <div className='container'>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="max-w-sm cart col-xl-3 col-lg-4 col-md-6 col-sm-12 rounded-lg overflow-hidden">
            <Link to={`http://127.0.0.1:3000/products/${product.attributes.slug}/${product.id}`}>
              <button className="px-2 py-1 relative heart text-center float-right top-[30px] right-[30px] text-white rounded">
                <FaHeart className="inline-block mr-1 text-2xl text-gray-300" />
              </button>
              <img
                src={`${process.env.REACT_APP_UPLOAD_URL+product.attributes.image.data.attributes.url}`}
                alt={product.attributes.name}
                className="w-full max-h-[170px] object-contain object-center"
              />
            </Link>

            <div className="p-4">
              <h2 className="text-2xl font-semibold font-bold text-gray-800">{product.attributes.name}</h2>
              <p className="text-sm text-gray-600 mt-2">{product.attributes.brand ? product.attributes.brand.name : ''}</p>
              <div className="flex">{calculateDisplayPrice(product)}</div>

              <div className="mt-2">
                <button className="px-4 py-2 bg-[#556638] text-white rounded mr-2">
                  <FaShoppingCart className="inline-block mr-1" /> Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
