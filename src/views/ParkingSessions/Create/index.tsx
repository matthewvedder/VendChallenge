// libraries
import React from 'react'
import { useNavigate } from 'react-router-dom'
// components
import Form from '../Form'
// database
import { database } from "../../../database"
import { collection, addDoc } from "firebase/firestore"; 
// styles
import './index.css'

export default function CreateParkingSession() {
  const navigate = useNavigate();

  const createParkingSession = async (parkingSession: {}) => {
    addDoc(
      collection(database, "parking-sessions"), 
      parkingSession,
    ).then(() => navigate('/?success=true'))
    .catch((error) => console.error(error))
  }

  return (
    <div className='create-parking-session'>
      <h1>Create Parking Session</h1>
      <Form onSubmit={createParkingSession} />
    </div>
  );
}

