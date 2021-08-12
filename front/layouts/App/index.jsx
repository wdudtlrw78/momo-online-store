import { Switch, Route } from 'react-router';
import loadable from '@loadable/component';
import React from 'react';
import BodyContainer from '@components/BodyContainer';
import Header from '@components/Header';
import Footer from '@components/Footer';
import CartPage from '../../pages/CartPage';

const HomeScreen = loadable(() => import('@pages/HomeScreen'));

function App() {
  return (
    <BodyContainer>
      <Header />
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/user/cart" component={CartPage} />
      </Switch>
      <Footer />
    </BodyContainer>
  );
}

export default App;
