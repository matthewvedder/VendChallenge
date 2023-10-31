// libraries
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ParkingSessions />} />
            <Route path="/parking-sessions/create" element={<CreateParkingSession />} />
          </Routes>
        </div>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
