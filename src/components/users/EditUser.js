import { useState, useEffect } from 'react';
import { editUser, getUser } from './../../services/api-users.js';
import { useNavigate, useParams } from 'react-router-dom';

import "./styles/AddUser.css";

const defaultValue = {
    username: "",
    email: "",
    password: "",
    role: ""
}

const EditUser = () => {

    const [user , setUser] = useState(defaultValue);

    const navigate = useNavigate();

    const { id } = useParams();

    console.log(id)

    useEffect( () =>{
        loadUserDetails();
    }, [])

    const loadUserDetails= async() => {

        const response = await getUser(id);
        setUser(response.data);

    }
 
    const onValueChange = (e) => {
        if (e.target.name === 'role') {
          setUser({ ...user, role: e.target.value });
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };

    const editUserDetails = async() => {
        await editUser(user, id);
        navigate('/');
    }

    
    //Validation

    const validate = () =>
		{
		
			let adduser_message_username = document.querySelector('.adduser-message-username');
			let adduser_message_email = document.querySelector('.adduser-message-email');
			let adduser_message_password = document.querySelector('.adduser-message-password');
			let adduser_message_confirm_password = document.querySelector('.adduser-message-confirm-password');

			if(user.username.trim().length < 3)
			{
			
				adduser_message_username.innerHTML = 'Please enter a valid username!';
				return false;
			
			}
			else if(user.email.indexOf('@') < 3 ||
            user.email.lastIndexOf ('.') < 7 )
			{
			
                adduser_message_username.style.display = 'none';
				adduser_message_email.innerHTML = 'invalid E-mail!';
				return false;
			
			}
			else if(user.password.trim().length < 8 ||
            user.password.trim().length > 50)
			{
                adduser_message_email.style.display = 'none';
				adduser_message_password.innerHTML = 'invalid Password!';
				return false;
				
			}//else if(user.password != user.confirm){
              //  adduser_message_password.style.display = 'none';
				//adduser_message_confirm_password.innerHTML = 'Please Confirm Password!';
				//return false;
           // }
            else
            {
                adduser_message_confirm_password.style.display = 'none';
                editUserDetails();
            }

            return false;
		}

         //Validation


    return(
        <>
            
            <div className='adduser-form adduserform'>
                <h1>EditUser</h1>
                <form>
                    <label htmlFor='username' className='login-fields-discription'>username*</label>
                    <span className='adduser-message-username'></span>
                    <input onChange={(e) => onValueChange(e)} name='username' className='adduser-fields-username' value={user.username}/>
                    <br/>
                    <label htmlFor='email' className='login-fields-discription'>email*</label>
                    <span className='adduser-message-email'></span>
                    <input onChange={(e) => onValueChange(e)} name='email' className='adduser-fields-email' value={user.email}/>
                    <br/>
                    <label htmlFor='password' className='login-fields-discription'>password*</label>
                    <span className='adduser-message-password'></span>
                    <input onChange={(e) => onValueChange(e)} name='password' className='adduser-fields-password'/>
                    <br/>
                    <label htmlFor='confirm-password' className='login-fields-discription'>confirm password*</label>
                    <span className='adduser-message-confirm-password'></span>
                    <input name='confirm' className='adduser-fields-confirm-password'/>
                    <br/>
                    <input type='button' onClick={validate} value='Edit' className='adduser-button'/>
                </form>
            </div>

        </>
    )

}
export default EditUser;