import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTeacher from './pages/CreateTeacher';
import ViewTeacher from './pages/ViewTeacher';
import CreateClass from './pages/CreateClass';
import ViewClass from './pages/ViewClass';
import NavigationBar from './pages/NavigationBar';

function App() {
  return (
    <div>
      <div className="App">
        <NavigationBar />
        <div className="container" id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/viewTeacher" element={<ViewTeacher />} />
            <Route path="/createTeacher" element={<CreateTeacher />} />
            <Route path="/viewClass" element={<ViewClass />} />
            <Route path="/createClass" element={<CreateClass />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
