// librairies
import React from 'react';
import { useNavigate } from 'react-router-dom'
// components
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Button } from '@mui/material';
// styles
import './index.css'


export default function Empty() {
  const navigate = useNavigate();

  return (
    <div className="empty">
      <DirectionsCarIcon sx={{ fontSize: 100 }} />
      <h2>No Parking Sessions</h2>
      <p>Click the button below to get started!</p>
      <Button variant='outlined' onClick={() => navigate('parking-sessions/create')}>
        Create Parking Session
      </Button>
    </div>
  )
}