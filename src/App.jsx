import './App.css'
import ApiView from './views/ApiView'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';



export default function App() {
  return (
    <>
      <Router>
        <div>
          {/* 
            <div className="sticky-top p-2 _nav">
              <div className="d-flex justify-content-center align-items-center space-x-4">
                <NavLink to="/" className={({ isActive }) => `nav-link p-2 ${isActive ? 'text-primary font-weight-bold text-decoration-underline' : 'text-secondary'}`}>
                  API
                </NavLink>
              </div>
            </div>
          */}
          <div className="container">
            <Routes>
              <Route path="/" element={<ApiView />} />
            </Routes>
          </div>
        </div>
      </Router >
    </>
  )
}


