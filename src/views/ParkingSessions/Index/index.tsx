// libraries
import React, { useEffect } from "react"
import dayjs from "dayjs";

// database
import { database } from "../../../database"
import { 
  doc, 
  collection, 
  onSnapshot, 
  DocumentData, 
  setDoc,
  query,
  orderBy
} from "firebase/firestore";

// components
import DataGrid from "./DataGrid"
import { Snackbar, Alert } from "@mui/material";

// styles
import './index.css'

export default function ParkingSessions() {
    const [parkingSessions, setParkingSessions] = React.useState<[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [alertOpen, setAlertOpen] = React.useState(false);

    const mapParkingSessions = (snapshot: DocumentData): any => {
      return snapshot.docs.map((doc: DocumentData) => {
        const { enteredAt, exitedAt } = doc.data()
        return ({ 
          ...doc.data(), 
          id: doc.id, 
          enteredAt: dayjs.unix(enteredAt).toDate(), 
          exitedAt: dayjs.unix(exitedAt).toDate() 
        })
      })
    }

    const completeParkingSession = (sessionId: string) => {
      const updatedSession = { status: 'completed', exitedAt: dayjs().unix() }
      setDoc(
        doc(database, "parking-sessions", sessionId), 
        updatedSession,
        { merge: true }
      ).catch((error) => {
        console.error(error)
      })
    }

    useEffect(() => {
      // fetch parking sessions in real time
      const parkingSessionsRef = collection(database, "parking-sessions")
      const sessionsQuery = query(parkingSessionsRef, orderBy('createdAt', 'desc'))
      onSnapshot(
        sessionsQuery, 
        (snapshot) => {
          setParkingSessions(mapParkingSessions(snapshot))
          setLoading(false)
        },
        (error) => {
          console.error(error)
          setLoading(false)
        });
    }, [])

    useEffect(() => {
      // check for success query param and show alert
      // I would normally use something like redux to manage state across components
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const success = urlParams.get('success')
      if (success) {
        setAlertOpen(true)
        window.history.pushState({}, "", "/")
      }
    }, [])

    const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setAlertOpen(false);
    };

    return (
        <div className="parking-sessions">
          <h1>Parking Sessions</h1>
          <DataGrid 
            parkingSessions={parkingSessions} 
            completeParkingSession={completeParkingSession} 
            loading={loading}
          />
          <Snackbar
            autoHideDuration={5000}
            open={alertOpen}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
              Successfully created parking session!
            </Alert>
          </Snackbar>
        </div>
    )
}   