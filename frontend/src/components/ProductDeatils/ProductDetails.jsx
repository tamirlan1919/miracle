import React, { useState, useEffect } from 'react';
import './ProductDeatils.css';
import { BsHeart } from 'react-icons/bs';
import { BsHeartFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Slider } from 'react-slick';
const ProductDetails = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Количество отображаемых слайдов одновременно
    slidesToScroll: 1,
  };
  const { id } = useParams();
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [selectedVolume, setSelectedVolume] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [mainImage, setMainImage] = useState('');



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

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  const toggleDescription = () => {
    setIsDescriptionOpen((prevIsOpen) => !prevIsOpen);
    setIsReviewsOpen(false);
  };

  const toggleReviews = () => {
    setIsReviewsOpen((prevIsOpen) => !prevIsOpen);
    setIsDescriptionOpen(false);
  };

  const product = products.find(
    (product) => product.id === Number(id) && product.attributes.slug.toLowerCase() === slug.toLowerCase()
  );

  const calculateDiscountPercent = () => {
    if (product.attributes.is_on_sale && product.attributes.old_price !== null) {
      const discountPercent = ((product.attributes.old_price - product.attributes.price) / product.old_price) * 100;
      return discountPercent.toFixed(0);
    }
    return 0;
  };

  const [isFilled, setIsFilled] = useState(false);

  const changebg = () => {
    setIsFilled((prevIsFilled) => !prevIsFilled);
  };

  const handleVolumeChange = (volume) => {
    setSelectedVolume(volume);
  };

  const getPriceForSelectedVolume = () => {
    if (selectedVolume === 0) {
      return product.attributes.price;
    }
    const selectedVolumeOption = product.volume_option.find((option) => option.volume_ml === selectedVolume);
    if (selectedVolumeOption) {
      return selectedVolumeOption.price;
    }
    return product.price;
  };
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (product && product.attributes.image && product.attributes.image.data) {
      setMainImage(`${process.env.REACT_APP_UPLOAD_URL + product.attributes.image.data.attributes.url}`);
    }
  }, [product]);

  if (!product) {
    return (
      <div>
        <h2>Товар не найден</h2>
      </div>
    );
  }
  console.log(product)
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="info">
            <a href="/" className="mr-3">
              Home
            </a>
            <a href="">{product.attributes.name}</a>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 flex">
            <div className="cart-imgs self-center">
            {product.attributes.image2.data && product.attributes.image2.data.length > 0 && (
                product.attributes.image2.data.map((image, index) => (
                  <img
                    key={index}
                    src={`${process.env.REACT_APP_UPLOAD_URL + image.attributes.url}`}
                    width={'150px'}
                    alt={`Product ${index}`}
                    className="thumbnail mb-2 rounded-lg"
                    onMouseOver={() => setMainImage(`${process.env.REACT_APP_UPLOAD_URL + image.attributes.url}`)}
                  />
                ))
              )}

            </div>
            <div className="ml-10 self-center img max-w-[444px]">
            <img
                id="main-image"
                src={mainImage}
                className="rounded-lg"
                alt=""
              />          </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="name-perfume">
              <h1>{product.attributes.name}</h1>
            </div>
            <div className="price flex mt-[53px]">
              {product.attributes.is_on_sale ? (
                <>
                  <p className="new_price mr-[12px]">{getPriceForSelectedVolume()}₽</p>
                  <p className="sale_price">
                    <s>{product.attributes.old_price}₽</s>
                  </p>
                  <p className="procent_number">{calculateDiscountPercent()}%</p>
                </>
              ) : (
                <p className="normal_price">{getPriceForSelectedVolume()} ₽</p>
              )}
            </div>
            <div className="descp">
              <p>{product.attributes.description}</p>
            </div>
            <hr />
            <div className="volume-select mt-5 mb-5">
              <label htmlFor="volume">Выберите объем:</label>
              {/* <select
                id="volume"
                className="text-black shadow-lg rounded-lg ml-3 text-[16px]"
                value={selectedVolume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
              >
                <option value={0}>Без выбора объема</option>
                {product.volume_option.map((option) => (
                  <option key={option.id} value={option.volume_ml}>
                    {option.volume_ml} ml
                  </option>
                ))}
              </select> */}
            </div>
            <hr />
            <div className="quantity mt-5 flex">
              <div className="colich flex">
                <button className="px-[16px] text-2xl mr-5" onClick={handleDecrement}>
                  -
                </button>
                <p className="text-2xl">{quantity}</p>
                <button className="px-[16px] text-2xl ml-5" onClick={handleIncrement}>
                  +
                </button>
              </div>
              <div className="add">
                <button className="">Добавить в корзину</button>
              </div>
              <div className="heartt">
                <button className={`text-black text-3xl py-3 px-4 `} onClick={changebg}>
                  {isFilled ? <BsHeartFill /> : <BsHeart />}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ProductDetails;
