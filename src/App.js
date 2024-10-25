import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home.js';
import Admin from './components/Admin/Admin.js';

import AllUsers from './components/users/AllUsers.js';
import AddUser from './components/users/AddUser.js';
import EditUser from "./components/users/EditUser.js";
import DeleteUser from "./components/users/DeleteUser.js";
import UserProfile from "./components/users/UserProfile.js";

import LoginUser from "./components/users/LoginUser.js";
import LogoutUser from "./components/users/LogoutUser.js";

import VideoConference from './components/VideoConference.js';

import './App.css';
import './fontawesome-free-6.2.0-web/css/all.min.css'

function App() {
  return (
    <div className="App">
      <Router>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300&family=Catamaran&display=swap');
        </style>

        <Routes>
          
        <Route exact path="/" element={<Home />} />
        <Route exact path="/videoconference" element={<VideoConference />} />
        <Route exact path="/admin" element={<Admin />} />

        <Route exact path="/allusers" element={<AllUsers />} />
        <Route exact path="/add-user" element={<AddUser />} />
        <Route exact path="/edituser/user/:id" element={<EditUser />} />
        <Route exact path="/deleteuser/user/:id" element={<DeleteUser />} />
        <Route exact path="/userprofile/:id" element={<UserProfile />} />

        <Route exact path="/login" element={<LoginUser />} />
        <Route exact path="/logout" element={<LogoutUser />} />

        </Routes>
    </Router>
      
    </div>
  );
}

export default App;
