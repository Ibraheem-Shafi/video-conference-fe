import { useState } from 'react';
import { addUser } from './../../services/api-users.js';

const defaultValue = {
    name: "",
    username: "",
    email: "",
    phone: ""
}

const AddUser = () => {

    const [user , setUser] = useState(defaultValue);

    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const addUserDetails = async() => {
        await addUser(user);
    }

    return(
        <>
            <p>Hello from AddUser</p>

            <form>
                <input onChange={(e) => onValueChange(e)} name='name'/>
                <br/>
                <input onChange={(e) => onValueChange(e)} name='username'/>
                <br/>
                <input onChange={(e) => onValueChange(e)} name='email'/>
                <br/>
                <input onChange={(e) => onValueChange(e)} name='phone'/>
            </form>
        </>
    )

}
export default AddUser;