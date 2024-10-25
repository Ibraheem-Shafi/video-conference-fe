import { getUsers , deleteUser } from './../../services/api-users.js';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./styles/AllUsers.css";

const AllUsers = () => {

    const navigate = useNavigate();
    const adminEmail = localStorage.getItem('email');
    console.log(adminEmail)
    useEffect(() => {
        if (adminEmail === 'ibraheem4562@outlook.com') {
            
        } else {
        navigate('/loginuser');
        }
    }, [adminEmail, navigate]);

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        getAllUsers();
    }, []);

    const getAllUsers = async() => {
        let response = await getUsers();
        setUsers(response.data);
    }  

    const deleteUserDetails = async (id) =>{
        await deleteUser(id);
        getAllUsers();
    }

    let sno = "1";

    return (
        <>

            <div className='allusers-main'>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Profile Picture</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                        <tr key={user._id}>
                            <td>{sno++}</td>
                            <td><img src={`http://localhost:5000/profile-pictures/${user.profilePicture}`} width="100" height="100" /></td>
                            <td>{user.firstname} {user.lastname}</td>
                            <td>{user.email}</td>
                            <td><Link to={`/edituser/user/${user._id}`}><span className='allusers-edit-link'>Edit</span></Link>
                                <button onClick={() => deleteUserDetails(user._id)}  className='allusers-delete-link'>Delete</button>
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>

        </>
)

}

export default AllUsers;