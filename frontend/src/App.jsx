import React from 'react'
import { Routes,Route } from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Budget from './pages/Budget';
import Reports from './pages/Reports';
import Profile from './pages/Profile';


import ProtectedRoute from "./components/ProtectedRoute";
import AIAssistant from "./pages/AIAssistant";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard /> 
        </ProtectedRoute>
      } />

      <Route path="/income" element={
        <ProtectedRoute>
          <Income /> 
        </ProtectedRoute>
      } />

      <Route path="/expense" element={
        <ProtectedRoute>
          <Expense /> 
        </ProtectedRoute>
      } />

      <Route path="/budget" element={
        <ProtectedRoute>
          <Budget /> 
        </ProtectedRoute>
      } />

      <Route path="/reports" element={
        <ProtectedRoute>
          <Reports /> 
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile/> 
        </ProtectedRoute>
      } />

      <Route path="/ai" element={
        <ProtectedRoute>
         <AIAssistant />
        </ProtectedRoute>
      }/>


    </Routes>
  );
}

export default App;
