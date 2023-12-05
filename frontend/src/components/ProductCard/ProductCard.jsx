import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import './ProductCard.css';
import axios from 'axios';
import { getProducts } from '../../redux/slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
const ProductCard = () => {
  const { products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the necessary actions to fetch products and categories when the component mounts
    dispatch(getProducts());
  }, [dispatch]);

  console.log(products==='loading')
  const isNewPrice = (products) => products.attributes?.is_on_sale && products.attributes?.old_price !== null;
  if(status==='loading'){
    <div className='loader'>
    <PropagateLoader color="#000" />
  </div>
  }
  if (!Array.isArray(products)) {
    return <p>No products available</p>;
  }
  const calculateDisplayPrice = (products) => {
    if (isNewPrice(products)) {
      const discountPercent = ((products.attributes?.old_price - products.attributes?.price) / products.attributes?.old_price) * 100;
      return (
        <>
          <span className="text-[20px] text-gray-800 mt-2 mr-2">
            {parseFloat(products.attributes?.price).toFixed(2)}₽
          </span>
          <span className="text-[18px] text-gray-400 mt-2">
            <s>{parseFloat(products.attributes?.old_price).toFixed(2)}₽</s>
            <span className="ml-2 text-red-500">-{discountPercent.toFixed(0)}%</span>
          </span>
        </>
      );
    } else {
      return (
        <span className="text-[20px] text-gray-800 mt-2 mr-2">
          {parseFloat(products.attributes?.price).toFixed(2)}₽
        </span>
      );
    }
  };

  return (
    <div className='container'>
      <div className="row">
        {products?.map((product) => (
          <div key={product?.id} className="max-w-sm cart col-xl-3 col-lg-4 col-md-6 col-sm-12 rounded-lg overflow-hidden">
            <Link to={`http://127.0.0.1:3000/products/${product.attributes?.slug}/${product?.id}`}>
              <button className="px-2 py-1 relative heart text-center float-right top-[30px] right-[30px] text-white rounded">
                <FaHeart className="inline-block mr-1 text-2xl text-gray-300" />
              </button>
              <img
                src={`${process.env.REACT_APP_UPLOAD_URL+product.attributes?.image.data.attributes.url}`}
                alt={product.attributes?.name}
                className="w-full max-h-[170px] object-contain object-center"
              />
            </Link>

            <div className="p-4">
              <h2 className="text-2xl font-semibold font-bold text-gray-800">{product.attributes?.name}</h2>
              <p className="text-sm text-gray-600 mt-2">{product.attributes?.brand ? product.attributes.brand?.name : ''}</p>
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
