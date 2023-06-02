import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameList from './Page/GameList';
import GameDetail from './Page/GameDetail.jsx';
import Profile from './Page/Profile';
import Search from './Page/Search';
import NotFound from './Page/NotFound';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
