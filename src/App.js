import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Logout from './pages/login/Logout';
import Header from './components/Header';
import Inventory from './pages/inventory/Inventory';

function App() {
  useEffect(() => {
    // TODO useEffect
  }, []);

  return (
    <Router>
        <div className=''>
          <Header />
          <Routes>
           <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/inventory' element={<Inventory />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
