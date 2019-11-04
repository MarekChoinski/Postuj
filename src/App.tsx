import React from 'react';

import ThemeSwitch from './components/ThemeSwitch';
import './styles/index.scss'
import MenuBar from './components/MenuBar';
import Mainpage from './pages/Mainpage';
import Page404 from './pages/Page404';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <MenuBar />
      <ThemeSwitch />

      <Switch>
        <Route exact path="/">
          <Mainpage />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>

    </Router>

  );
}

export default App;
