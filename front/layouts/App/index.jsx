import { Switch, Route } from 'react-router';
import loadable from '@loadable/component';
import React from 'react';

const HomeScreen = loadable(() => import('@pages/HomeScreen'));

function App() {
  return (
    <>
      <div>React</div>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
      </Switch>
      <footer>footer</footer>
    </>
  );
}

export default App;
