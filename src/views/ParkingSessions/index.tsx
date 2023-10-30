// libraries
import React from "react"

// components
import DataGrid from "./DataGrid"

// styles
import './index.css'

export default function ParkingSessions() {
    return (
        <div className="parking-sessions">
            <h1>Parking Sessions</h1>
            <DataGrid />
        </div>
    )
}   