import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import CreateTeacher from './pages/components/teachers/CreateTeacher';
import ViewTeacher from './pages/components/teachers/ViewTeacher';
import EditTeacher from './pages/components/teachers/EditTeacher';
import CreateClass from './pages/components/classes/CreateClass';
import ViewClass from './pages/components/classes/ViewClass';
import NavigationBar from './pages/components/NavigationBar';

// paths and elements could be put as an array instead.

function App() {
  return (
    <div>
      <div className="App">
        <NavigationBar />
        <div className="container" id="main-content">
          <Routes>
            <Route path="/" element={<ViewClass />} />
            <Route path="/viewTeacher" element={<ViewTeacher />} />
            <Route path="/createTeacher" element={<CreateTeacher />} />
            <Route path="/editTeacher/:id" element={<EditTeacher />} />
            <Route path="/viewClass" element={<ViewClass />} />
            <Route path="/createClass" element={<CreateClass />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
