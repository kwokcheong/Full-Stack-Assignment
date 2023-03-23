import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTeacher from './pages/CreateTeacher';
import Navbar from './pages/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <div className="App">
        <div className="container" style={{ maxWidth: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createTeacher" element={<CreateTeacher />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
