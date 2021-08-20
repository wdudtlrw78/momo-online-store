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
const Profile = loadable(() => import('@pages/profile'));
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
        <Route exact path="/profile" component={Auth(Profile, true)} />
        <Route exact path="/user/cart" component={Auth(Cart, null)} />
      </Switch>
      <Footer />
    </BodyContainer>
  );
}

export default App;
