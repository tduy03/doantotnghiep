
import { Profiler, useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutClient from "./layout/LayoutClient";
import Checkout from './pages/client/Checkout'
import Home from './pages/client/Home';
import { Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/client/ProductDetail';
import Register from './pages/Register';
import Cart from './pages/client/Cart';
import Login from './pages/Login';
import PaymentMomo from './pages/client/PaymentMomo';
import Contact from './pages/client/Contact';
import AllProducts from './pages/client/AllProducts';
import Order from './pages/client/Order';
import ProductWishlist from './pages/client/ProductWishlist';
import SearchProduct from './pages/client/search';
import AccountUpdate from './pages/client/AccountUpdate';
import LogoutInterface from './pages/client/LogOut';
import Profile from './pages/client/Profile';
import PrivateRoute from './components/client/PrivateRoute/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import ProductsCate from './pages/client/ProductsCate';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProductView from './pages/client/ProductView';
import News from './pages/client/News';
import MyPromotion from './pages/client/MyPromotion';
function App() {
  return (
    <>
      <Routes>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='logout' element={<LogoutInterface />} />
        <Route path='/' element={<LayoutClient />} >
          <Route index element={<Home />} />
          <Route path='productdetail/:id/subcate/:idd' element={<ProductDetail />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/resetpassword/:token' element={<ResetPassword />} />
          <Route element={<PrivateRoute />}>
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment" element={<PaymentMomo />} />
            <Route path="order" element={<Order />} />
            <Route path="wishlist" element={<ProductWishlist />} />
            <Route path="profile" element={<Profile />} >
              <Route path="order" element={<Order />} />
              <Route path="productview" element={<ProductView />} />
              <Route path="promotion" element={<MyPromotion />} />
              <Route index element={<AccountUpdate />} />
            </Route>
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/news" element={<News />} />
          <Route path="products/cate/:id/:name" element={<ProductsCate />} />
        </Route>

      </Routes>
      <ScrollToTop />
      <ToastContainer />
    </>
  );
}

export default App;
