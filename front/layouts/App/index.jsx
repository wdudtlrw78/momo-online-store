import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route } from 'react-router';
import BodyContainer from '@components/BodyContainer';
import Header from '@components/Header';
import Footer from '@components/Footer';

const Home = loadable(() => import('@pages/Home'));
const Login = loadable(() => import('@pages/Login'));
const Register = loadable(() => import('@pages/Register'));
const Cart = loadable(() => import('@pages/Cart'));

function App() {
  return (
    <BodyContainer>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user/cart" component={Cart} />
      </Switch>
      <Footer />
    </BodyContainer>
  );
}

export default App;
