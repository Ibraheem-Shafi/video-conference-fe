import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/api-users';

import "./styles/LoginUser.css";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      // Assuming successful login, you can store the token in local storage
      const {token, role} = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('userEmail', response.data.email);
      localStorage.setItem('role', role);

      if(email === 'admin@vidshare.com')
      {
        navigate("/admin");
      }
      else{
        navigate("/");
      }
      
    } catch (error) {
      // Handle login error, display error message or perform necessary actions
      console.log("Login failed:", error);
    }
  };

  return (
    <>
      
      <div className='login-form'>
        <h1>Login</h1>
        <form>
          <label htmlFor='email' className='login-fields-discription'>Email*</label>
          <input
            type='email'
            name='email'
            className='login-fields-interactive'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor='password' className='login-fields-discription'>Password*</label>
          <input
            type='password'
            name='password'
            className='login-fields-interactive'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Link to={'/add-user'} className='login-rigister-account-link'>Don't have an account?</Link>
          <input type='checkbox' name='rememberme' className='login-rememberme-checkbox' />
          <label htmlFor='username' className='login-rememberme-discription'>remember me</label>
          <br />
          <input type='button' value='Login' className='login-button' onClick={handleLogin} />
        </form>

        <div className='background-icons'>
            <span className='background-icon-1'><i class="fa-solid fa-video"></i></span>
            <span className='background-icon-2'><i class="fa-solid fa-camera"></i></span>
            <span className='background-icon-3'><i class="fa-solid fa-headphones"></i></span>
            <span className='background-icon-4'><i class="fa-solid fa-clapperboard"></i></span>
            <span className='background-icon-6'><i class="fa-solid fa-file-video"></i></span>
            <span className='background-icon-7'><i class="fa-solid fa-video"></i></span>
            <span className='background-icon-8'><i class="fa-solid fa-camera"></i></span>
            <span className='background-icon-10'><i class="fa-solid fa-clapperboard"></i></span>
            <span className='background-icon-12'><i class="fa-solid fa-file-video"></i></span>
            <span className='background-icon-13'><i class="fa-solid fa-video"></i></span>
        </div>

      </div>
    </>
  );
};

export default LoginUser;