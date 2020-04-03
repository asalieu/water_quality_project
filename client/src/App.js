import React from 'react';
import './App.css';
import SignIn from './components/login/SignIn';
import SignUp from './components/signup/SignUp';
import Main from './components/userContext/Main';
import Manage from './components/userContext/Manage'
import Manage_Data from './components/userContext/Manage_Data'
import Chart from './components/userContext/Chart'
import Routes from './components/routes/Routes';
import tes from './components/userContext/tes'


function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
