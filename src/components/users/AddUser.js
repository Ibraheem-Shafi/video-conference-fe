import { useState, useEffect } from 'react';
import { addUser } from './../../services/api-users.js';
import { useNavigate } from 'react-router-dom';
//import sendEmail from '../../backend/emailSender';

import "./styles/AddUser.css";

const defaultValue = {
    username: "",
    email: "",
    password: "",
    role: "user",
    profilePicture: null,
}

const AddUser = () => {
    
    const navigate = useNavigate();

    const [user, setUser] = useState(defaultValue);

    // Function to handle profile picture selection
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setUser({ ...user, profilePicture: file });
    };
    


    const onValueChange = (e) => {
        if (e.target.name === 'role') {
          setUser({ ...user, role: e.target.value });
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };

      const addUserDetails = async () => {
        try {
          const formData = new FormData();
          formData.append("firstname", user.firstname);
          formData.append("lastname", user.lastname);
          formData.append("email", user.email);
          formData.append("password", user.password);
          formData.append("role", user.role);
          formData.append("profilePicture", user.profilePicture); // Append the file
    
          await addUser(formData);
        } catch (error) {
          console.log('Error while adding user: ', error);
        }
      };

    
   // const sendWelcomeEmail = () => {
     //   const recipientEmail = user.email;
       // const subject = "Welcome to Our Website";
       // const content = "Thank you for signing up. We are excited to have you on board!";
       // sendEmail(recipientEmail, subject, content);
    //};


    //Validation

    const validate = () =>
		{
		
			var regform = document.querySelector('.adduserform');

			let adduser_message_firstname = document.querySelector('.adduser-message-firstname');
			let adduser_message_email = document.querySelector('.adduser-message-email');
			let adduser_message_password = document.querySelector('.adduser-message-password');
			let adduser_message_confirm_password = document.querySelector('.adduser-message-confirm-password');

			if(user.firstname.trim().length < 3)
			{
			
				adduser_message_firstname.innerHTML = 'Please enter a valid name!';
				return false;
			
			}
			else if(user.email.indexOf('@') < 3 ||
            user.email.lastIndexOf ('.') < 7 )
			{
			
        adduser_message_firstname.style.display = 'none';
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
                addUserDetails();
               // sendWelcomeEmail();
                
            }


            return false;
		}

    //Validation

    return(
        <>
        
        <div className='adduser-form adduserform'>
            <h1>Register</h1>
            <form>
                <label htmlFor='firstname' className='login-fields-discription'>First name*</label>
                <span className='adduser-message-firstname'></span>
                <input onChange={(e) => onValueChange(e)} name='firstname' className='adduser-fields-username'/>
                <br/>
                <label htmlFor='lastname' className='login-fields-discription'>Last name*</label>
                <span className='adduser-message-lastname'></span>
                <input onChange={(e) => onValueChange(e)} name='lastname' className='adduser-fields-username'/>
                <br/>
                <label htmlFor='email' className='login-fields-discription'>email*</label>
                <span className='adduser-message-email'></span>
                <input onChange={(e) => onValueChange(e)} name='email' className='adduser-fields-email'/>
                <br/>
                <label htmlFor='password' className='login-fields-discription'>password*</label>
                <span className='adduser-message-password'></span>
                <input onChange={(e) => onValueChange(e)} name='password' className='adduser-fields-password'/>
                <br/>
                <label htmlFor='confirm-password' className='login-fields-discription'>confirm password*</label>
                <span className='adduser-message-confirm-password'></span>
                <input name='confirm' className='adduser-fields-confirm-password'/>
                <br/>
                <label htmlFor='profilePicture' className='login-fields-discription'>Profile Picture*</label>
                <input type="file" onChange={(e) => handleFileChange(e)} name='profilePicture'  className='adduser-fields-profilePicture'/>
                <br/>
                <input type='button' onClick={validate} value='Register' className='adduser-button'/>
            </form>
        </div>

        </>
    )

}

export default AddUser;