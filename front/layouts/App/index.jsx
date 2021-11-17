import React from 'react';
import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';
import BodyContainer from '@components/BodyContainer';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Auth from '@hoc/auth';
import NotFound from '@components/NotFound';

const Home = loadable(() => import('@pages/Home'));
const Login = loadable(() => import('@pages/Login'));
const Register = loadable(() => import('@pages/Register'));
const Admin = loadable(() => import('@pages/Admin'));
const History = loadable(() => import('@pages/History'));
const ProductsLanding = loadable(() => import('@pages/ProductsLanding'));
const DetailProduct = loadable(() => import('@pages/DetailProduct'));
const Cart = loadable(() => import('@pages/Cart'));

function App() {
  return (
    <BodyContainer>
      <Header />
      <Routes>
        <Route path="/" element={<Auth SpecialComponent={Home} />} />
        <Route path="/login" element={<Auth SpecialComponent={Login} />} />
        <Route path="/register" element={<Auth SpecialComponent={Register} />} />
        <Route path="/admin" element={<Auth SpecialComponent={Admin} />} />
        <Route path="/shop" element={<Auth SpecialComponent={ProductsLanding} />} />
        <Route path="/shop/product/:productId" element={<Auth SpecialComponent={DetailProduct} />} />
        <Route path="/user/cart" element={<Auth SpecialComponent={Cart} />} />
        <Route path="/history" element={<Auth SpecialComponent={History} />} />
        <Route path="*" element={<Auth SpecialComponent={NotFound} />} />
      </Routes>
      <Footer />
    </BodyContainer>
  );
}

export default App;
