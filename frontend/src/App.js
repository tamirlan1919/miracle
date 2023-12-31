import './App.css';
import ProductCard from './components/ProductCard/ProductCard';
import CarousBrands from './components/carousel-brands/CarousBrands';
import Carousel from './components/carousel/Carousel';
import Header from './components/header/Header';
import Nav from './components/Nav/Nav';
import Shops from './components/Shops/Shops';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserIcon from './components/UserIcon/UserIcon';
import ProductDetails from './components/ProductDeatils/ProductDetails';
import Login from './components/Login/Login';
import About from './pages/About/About';
import Work from './pages/Work/Work';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import BrandProducts from './pages/BrandProducts/BrandProducts';
import Registration from './components/Registration/Registration';
import Favorites from './components/Favorites/Favorites';
import Cart from './components/Cart/Cart';
import Home from './pages/Home/Home';
import FooterComp from './components/Footer/Footer';
import { MantineProvider } from '@mantine/core';
import { NotPage } from './pages/NotPage/NotPage';
import Logout from './components/Logout';

function App() {




  return (
    <>
    <MantineProvider defaultColorScheme='dark'>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="shops" element={<Shops />} />
      <Route path="products/:slug/:id" element={<ProductDetails />} />
      <Route path = 'about' element = {<About/>}/>
      <Route path = 'work' element = {<Work/>}/>
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="sign-up" element={<Registration />} />
      <Route path="cart" element={<Cart />} />
      <Route path="categories/:categorySlug" element={<CategoryPage/>} />
      <Route path="brands/:slug" element={<BrandProducts/>} />
      <Route element={<NotPage/>} />

    </Routes>
    <FooterComp/>
  </BrowserRouter>

  </MantineProvider>

  </>

  );
}
export default App
