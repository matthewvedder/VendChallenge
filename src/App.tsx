// libraries
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// components
import ParkingSessions from './views/ParkingSessions/Index'
import CreateParkingSession from './views/ParkingSessions/Create'

// styles
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ParkingSessions />} />
          <Route path="/parking-sessions/create" element={<CreateParkingSession />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
