import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TaskManager from './pages/TaskManager';
import About from './pages/About';
import './App.css'

const App = () => {
  return (
    <Router>
      <div style={ { display: 'flex' } }>
        <Navbar></Navbar>
        <div style={ { flex: '1', transition: 'margin-left 0.3s' } }>
          <Routes>
            <Route path='/' exact Component={ Home }></Route>
            <Route path='/tasks' Component={ TaskManager }></Route>
            <Route path='/about' Component={ About }></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
