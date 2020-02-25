import React, { useContext } from 'react';

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
import ProfilePage from './pages/ProfilePage';

import { ThemeContext } from './contexts/ThemeContext';

const App: React.FC = () => {

  const { theme } = useContext(ThemeContext);

  return (
    <body className={theme}>
      <main className="main">
        <Router>
          <MenuBar />
          <div className="main__wrapper">
            <ThemeSwitch />

            <Switch>
              <Route exact path="/" component={Mainpage} />
              <Route exact path="/signup" component={SignUpPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route path="/post/:id" component={PostPage} />
              <Route path="/profile/:id" component={ProfilePage} />
              <Route path="*" component={Page404} />
            </Switch>

          </div>
        </Router>
      </main>
    </body>

  );
}

export default App;
