import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { getProductId} from '../../redux/slice/productSlice';
import { authMe, postProductInCart } from "../../redux/slice/authSlice";
import axios, { all } from 'axios';
import styles from './ProductDeatils.css'; // Ensure the correct path
import ProductDetailsInfo from './ProductDetailsInfo';
import ProductDetailsInfoDouble from './ProductDetailsInfoDouble';

const ProductDetails = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { id } = useParams();
  const { data } = useSelector((state) => state.auth);
  const url = 'http:localhost:1377';

  useEffect(() => {
    console.log("RENDER");
    dispatch(getProductId(id));
    dispatch(authMe());
  }, [dispatch, id]);



  const handlePostCart = () => {
   
    const field = {
      cart: [...data?.cart, { [products.id]: Number(id) }],
    };
    dispatch(postProductInCart(field));
  };
  const [selectedVolume, setSelectedVolume] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const [all_products,SetAllProducts] = useState([])

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
        SetAllProducts(response.data.data); // Access the 'data' property in the response

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



  const calculateDiscountPercent = () => {
    if (products.attributes?.is_on_sale && products.attributes?.old_price !== null) {
      const discountPercent = ((products.attributes?.old_price - products.attributes?.price) / products.old_price) * 100;
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
      return products.attributes?.price;
    }
    const selectedVolumeOption = products.volume_option.find((option) => option.volume_ml === selectedVolume);
    if (selectedVolumeOption) {
      return selectedVolumeOption.price;
    }
    return products.price;
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const isNewPrice = (products) => products.attributes?.is_on_sale && products.attributes?.old_price !== null;

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
  useEffect(() => {
    if (products && products.attributes?.image && products.attributes?.image.data) {
      setMainImage(`${process.env.REACT_APP_UPLOAD_URL + products.attributes?.image.data.attributes.url}`);
    }
  }, [products]);

  if (!products) {
    return (
      <div>
        <h2>Товар не найден</h2>
      </div>
    );
  }
console.log(products)
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="info">
          <a href="/" className="mr-3">
            Home
          </a>
          <a href="">{products.attributes?.name}</a>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 flex">
          <div className="cart-imgs self-center">
          {products.attributes?.image2.data && products.attributes?.image2.data.length > 0 && (
                products.attributes?.image2.data.map((image, index) => (
                  <img
                    key={index}
                    src={`${process.env.REACT_APP_UPLOAD_URL + image.attributes?.url}`}
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
            <h1>{products.attributes?.name}</h1>
          </div>
          <div className="price flex mt-[53px]">
            {products.attributes?.is_on_sale ? (
              <>
                <p className="new_price mr-[12px]">{getPriceForSelectedVolume()}₽</p>
                <p className="sale_price">
                  <s>{products.attributes?.old_price}₽</s>
                </p>
                <p className="procent_number">{calculateDiscountPercent()}%</p>
              </>
            ) : (
              <p className="normal_price">{getPriceForSelectedVolume()} ₽</p>
            )}
          </div>
          <div className="descp">
            <p>{products.attributes?.description}</p>
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
              {products.volume_option.map((option) => (
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
            <button onClick={handlePostCart}>
              Добавить в корзину
            </button>
            </div>
            <div className="heartt">
              <button className={`text-black text-3xl py-3 px-4 `} onClick={changebg}>
                {isFilled ? <BsHeartFill /> : <BsHeart />}
              </button>
            </div>
          </div>
        </div>
      </div>
        <div className="row mt-5 mb-5">
          <div className="col-xl-6 text-2xl text-center">
            <ProductDetailsInfo product={products.attributes?.characteristic}/>
          </div>
          <div className="col-xl-6 text-2xl text-center">
            <ProductDetailsInfoDouble/>
          </div>
        </div>
        <div className="row">
          <h1 className='text-2xl text-center mt-5 mb-5'>Похожие товары</h1>
          {all_products.map((products) => (
              (products.id!=id ? 
          <div key={products.id} className="max-w-sm cart col-xl-3 col-lg-4 col-md-6 col-sm-12 rounded-lg overflow-hidden">
            <Link to={`http://127.0.0.1:3000/products/${products.attributes.slug}/${products.id}`}>
              <button className="px-2 py-1 relative heart text-center float-right top-[30px] right-[30px] text-white rounded">
                <FaHeart className="inline-block mr-1 text-2xl text-gray-300" />
              </button>
              <img
                src={`${process.env.REACT_APP_UPLOAD_URL+products.attributes.image.data.attributes.url}`}
                alt={products.attributes.name}
                className="w-full max-h-[170px] object-contain object-center"
              />
            </Link>

            <div className="p-4">
              <h2 className="text-2xl font-semibold font-bold text-gray-800">{products.attributes.name}</h2>
              <p className="text-sm text-gray-600 mt-2">{products.attributes.brand ? products.attributes.brand.name : ''}</p>
              <div className="flex">{calculateDisplayPrice(products)}</div>

              <div className="mt-2">
                <button className="px-4 py-2 bg-[#556638] text-white rounded mr-2">
                  <FaShoppingCart className="inline-block mr-1" /> Добавить в корзину
                </button>
              </div>
            </div>
          </div>
             :<p></p> )
        ))}

          </div>
    </div>
  </>
  );
};

export default ProductDetails;
