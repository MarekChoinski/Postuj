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
  // Link
} from "react-router-dom";
import PostPage from './pages/PostPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <Router>
      <MenuBar />
      <ThemeSwitch />

      <Switch>
        <Route exact path="/" component={Mainpage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="*" component={Page404} />
      </Switch>

    </Router>

  );
}

export default App;
