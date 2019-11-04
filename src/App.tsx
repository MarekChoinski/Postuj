import React from 'react';

import ThemeSwitch from './components/ThemeSwitch';
import './styles/index.scss'
import MenuBar from './components/MenuBar';
import Post from './components/Post';

const App: React.FC = () => {
  return (
    <>
      <ThemeSwitch />
      <MenuBar />
      <Post />
    </>
  );
}

export default App;
