import React, { useState } from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from "./pages/Home/home"

function App () {
    return(
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
        </>
    )
}

export default App