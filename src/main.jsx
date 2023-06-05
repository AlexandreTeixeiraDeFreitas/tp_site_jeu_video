import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameList from './Page/GameList.jsx';
import GameDetail from './Page/GameDetail.jsx';
import Profile from './Page/Profile.jsx';
import Search from './Page/Search.jsx';
import NotFound from './Page/NotFound.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import { Analytics } from '@vercel/analytics/react';
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

<BrowserRouter>
<NavBar />
<Routes>
  <Route path="/" element={<GameList />} />
  <Route path="/game/:id" element={<GameDetail />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/search" element={<Search />} />
  <Route path="*" element={<NotFound />} />
</Routes>
<Footer />
<Analytics />
</BrowserRouter>

)
