// libraries
import React, { useEffect } from "react"
import dayjs from "dayjs";

// database
import { database } from "../../../database"
import { doc, collection, onSnapshot, DocumentData, setDoc } from "firebase/firestore";

// components
import DataGrid from "./DataGrid"

// styles
import './index.css'

export default function ParkingSessions() {
    const [parkingSessions, setParkingSessions] = React.useState<[]>([]);
    const [error, setError] = React.useState<Error | null>(null);

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
        setError(error.message)
      })
    }

    useEffect(() => {
      onSnapshot(
        collection(database, "parking-sessions"), 
        (snapshot) => {
          setParkingSessions(mapParkingSessions(snapshot))
        },
        (error) => {
          setError(error)
        });
    }, [database])

    return (
        <div className="parking-sessions">
            <h1>Parking Sessions</h1>
            <DataGrid parkingSessions={parkingSessions} completeParkingSession={completeParkingSession} />
        </div>
    )
}   