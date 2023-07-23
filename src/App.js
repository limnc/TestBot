import React, { useEffect } from "react"
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom"
import Cookies from "js-cookie";
// import logo from './logo.svg';
// import './App.css';
import Header from "./Pages/header.jsx";
import BOT from "./Pages/bot.jsx";
import TestCaseManagement from "./Pages/testcase.jsx";
import Account from "./Pages/account.jsx";
import Device from "./Pages/device.jsx";
import Management from "./Pages/agencyDeviceManagement.jsx";
import Agency from "./Pages/agency.jsx";
import Login from "./Pages/login.jsx";
import Logout from "./Pages/logout.jsx";
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
const App = () => {
  const currentPath = window.location.pathname;
  const validateAgentID = () => {
    const agentID = Cookies.get('agentID');
   

    if (!agentID && currentPath !== '/login') {
      return <Navigate to="/login" replace />;
    }

    return null;
  }

  useEffect(()=>{
    validateAgentID()
  },[currentPath])

  return (

    <div className="app">

      <Router>
        {validateAgentID()}
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Header></Header>
        <br />
        <Routes>
          <Route path="/" element={<BOT />} />
          <Route path="/bot" element={<BOT />} />
          <Route path="/test-case" element={<TestCaseManagement />} />
          <Route path="/device-management" element={<Device />} />
          <Route path="/agency-management" element={<Agency />} />
          <Route path="/account-management" element={<Account />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>

    </div>
  )
}
export default App

