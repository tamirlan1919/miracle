import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosClose } from "react-icons/io";

import { BsList } from 'react-icons/bs';
import { AiOutlineHeart, AiOutlineUser, AiOutlineShopping } from 'react-icons/ai';
import { FiMapPin } from 'react-icons/fi';
import { getProducts } from '../../redux/slice/productSlice';
import SearchComponent from '../SearchComponent/SearchComponent';
import { getCategories } from '../../redux/slice/catalogSlice';
import { authMe } from '../../redux/slice/authSlice'; 

import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import img from './Frame 1 (3).svg';
import { CButton, COffcanvas, COffcanvasHeader, COffcanvasTitle, CCloseButton, COffcanvasBody } from '@coreui/react';


const Header = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { categories, status } = useSelector((state) => state.categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.auth);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Dispatch the necessary actions to fetch products and categories when the component mounts
    dispatch(authMe());
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <div className='block items-center p-2 bg-[#F0F0F0]'>
        <a href='shops' className='text-1xl flex'><button className='text-1xl mr-5'><FiMapPin /></button> Магазины</a>
      </div>
      <div>
        <nav className="text-black p-4">
          <div className="container mx-auto">
            <ul className="flex uppercase text-[14px] leading-6 justify-center  text-black">
              <li className='mr-20'><a href="/">Бренды</a></li>
              <li className='mr-20'><a href="/">Акции</a></li>
              <li className='mr-20'><a href="http://127.0.0.1:3000/work">Вакансии</a></li>
              <li><a href="http://127.0.0.1:3000/about">О нас</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className='container mb-3'>
        <div className="row">
          <div className="imgs  col-xl-2 mr-[50px] col-lg-2">
            <a href="/" className='miracle'><img className='miracle_img w-full' src={img} alt="" /></a>
          </div>
          <div className={`col-xl-1 col-lg-1 col-md-2 col-sm-2 py-2 rounded-lg max-w-[148px] self-center  flex max-h-[42px]  mr-7  text-[12px]   catalog ${isModalOpen ? 'bg-[#E8E8E8] text-[black]' : 'bg-[#028103] text-white' }`} onClick={openModal}>
            {isModalOpen ?
            <button className='bs text-3xl'>
            <IoIosClose />
            </button>
            :
            <button className='bs text-2xl'>
            <BsList />
            </button>}
          </div>
          <div className="poisk  col-xl-6 col-lg-6 col-md-7 col-sm-3 self-center block relative">
            <SearchComponent />
          </div>
          <div className='col-xl-2 users col-lg-3 col-md-3 pl-10 py-1 self-center text-3xl'>
            <div className="wrap flex">
              <div className="favorite">
            <a href="/favorites">
                <button className=' btns mr-4'><AiOutlineHeart /></button>
              </a>
              <span>0</span>
              </div>
              <div className="user">
              <a href="/login">
                <button type="button" className="mr-4 btns   border-none pointer-events-auto" >
                  <AiOutlineUser />
                </button>
              </a>
              
              </div>
              <div className="cart max-w-[46px]">
                <a href="/cart">
                  <button className='btns'><AiOutlineShopping /></button>
                </a>
                <span>0</span>
              </div>
              </div>
          </div>
        </div>
      </div>

      <COffcanvas placement="start" className= 'text-black' scroll={true} visible={isModalOpen} onHide={closeModal}>
        <COffcanvasHeader>
          <COffcanvasTitle>Categories</COffcanvasTitle>
          
          <button className='text-3xl' onClick={closeModal}>
            <IoIosClose/>
          </button>
        </COffcanvasHeader>
        <COffcanvasBody>
          {/* Render categories */}
          {status === 'loading' && <p>Loading...</p>}
          {status === 'loaded' && (
            <ul className="list-group">
              {categories.map((category) => (
                <li key={category.id} className="list-group-item">
                  <Link to={`/categories/${category.attributes.slug}`} onClick={closeModal}>
                    {category.attributes.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {status === 'error' && <p>Error loading categories.</p>}
        </COffcanvasBody>
      </COffcanvas>
    </>
  );
};

export default Header;
