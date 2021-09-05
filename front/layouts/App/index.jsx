import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route } from 'react-router';
import BodyContainer from '@components/BodyContainer';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Auth from '@hoc/auth';

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
      <Switch>
        <Route exact path="/" component={Auth(Home, null)} />
        <Route exact path="/login" component={Auth(Login, false)} />
        <Route exact path="/register" component={Auth(Register, false)} />
        <Route exact path="/admin" component={Auth(Admin, true, true)} />
        <Route exact path="/shop" component={Auth(ProductsLanding, null)} />
        <Route exact path="/shop/product/:productId" component={Auth(DetailProduct, null)} />
        <Route exact path="/user/cart" component={Auth(Cart, null)} />
        <Route exact path="/history" component={Auth(History, true)} />
      </Switch>
      <Footer />
    </BodyContainer>
  );
}

export default App;
