import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route } from 'react-router';
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
      <Switch>
        <Route exact path="/" component={Auth(Home)} />
        <Route exact path="/login" component={Auth(Login)} />
        <Route exact path="/register" component={Auth(Register)} />
        <Route exact path="/admin" component={Auth(Admin)} />
        <Route exact path="/shop" component={Auth(ProductsLanding)} />
        <Route exact path="/shop/product/:productId" component={Auth(DetailProduct)} />
        <Route exact path="/user/cart" component={Auth(Cart)} />
        <Route exact path="/history" component={Auth(History)} />
        <Route path="*" component={Auth(NotFound)} />
      </Switch>
      <Footer />
    </BodyContainer>
  );
}

export default App;
