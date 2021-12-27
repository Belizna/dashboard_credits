import './App.css';
import React from 'react';
import Main from './pages/Main/Main'
import TransactionPages from './pages/TransactionPages/TransactionPages';
import {Routes, Route} from "react-router-dom"

function App() {   
  return (
    <>
    <Routes>
    <Route path="/" element={<Main/>} exact/>
    <Route path="/credit/:handle" element={<TransactionPages/>} exact/>
    </Routes>
    </>
  );
}

export default App;
