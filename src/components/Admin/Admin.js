import React from 'react'
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <>
        <div>Admin</div>
        <Link to="/all-users" >All Users</Link>
        <br />
        <Link to="/add-user" >Add User</Link>
        <br />
        <Link to="/all-videos" >All Videos</Link>
        <br />
        <Link to="/add-video" >Add Video</Link>
        
    </>
  )
}

export default Admin