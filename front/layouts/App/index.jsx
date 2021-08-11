import { Switch, Route } from 'react-router';
import loadable from '@loadable/component';
import React from 'react';
import BodyContainer from '@components/BodyContainer';
import Header from '@components/Header';
import Footer from '@components/Footer';

const HomeScreen = loadable(() => import('@pages/HomeScreen'));

function App() {
  return (
    <BodyContainer>
      <Header />
      <Switch>
        <Route exact path="/" component={HomeScreen} />
      </Switch>
      <Footer />
    </BodyContainer>
  );
}

export default App;
