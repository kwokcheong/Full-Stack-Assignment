import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTeacher from './pages/CreateTeacher';
import NavigationBar from './pages/NavigationBar';

function App() {
  return (
    <div>
      <div className="App">
        <NavigationBar />
        <div className="container" id="main-content">
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
