import './App.css';
import React from 'react';
import Main from './pages/Main/Main'
import Auth from "./pages/Auth/Auth"
import TransactionPages from './pages/TransactionPages/TransactionPages';
import {Routes, Route, Navigate} from "react-router-dom"
import { useSelector } from 'react-redux';


function App() {   

  const {isAuth} = useSelector((state) => state.data_user)
  return (
    <>
     {!isAuth ?
       <Routes>
         <Route path="/auth" element={<Auth/>} exact/>
         <Route
            path="*"
            element={<Navigate to="/auth" replace />}
          />
       </Routes>
       :
       <Routes>
       <Route path="/credits/" element={<Main/>} exact/>
       <Route path="/credit/:handle" element={<TransactionPages/>} exact/>
          <Route
            path="*"
            element={<Navigate to="/credits" replace />}
          />
      </Routes>
    }

    </>
  );
}

export default App;
