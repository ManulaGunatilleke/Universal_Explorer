import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Auth/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login_logo from "../../assets/images/Login_img/loginpic2.jpg";
import UserContext from '../ContextComponents/ContextComponents';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [UserType, setUserType] = useState('');
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let apiUrl = '';
    if (UserType === 'User') {
      apiUrl = 'http://localhost:8070/auth/loginUser';
    } else if (UserType === 'SystemAdmin') {
      apiUrl = 'http://localhost:8070/auth/loginSystemAdmin';
    } else {
      apiUrl = 'http://localhost:8070/auth/loginUser';
      return;
    }
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Password: password }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;
        const user = data.user || data.systemAdmin; 
  
        setUser(user);
  
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
  
        if (UserType === 'User') {
          navigate('/userHome'); 
        } else if (UserType === 'SystemAdmin') {
          navigate('/systemAdminHome'); 
        }
      } else {
        toast.warn('Please enter correct details..!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      toast.warn('Please enter correct details..!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  

  return (
    <div className="login_page">
      <div className="heading"><a href="/" className="loginCompanyName"><h1 className="log_sign_heading_name">Universal Explorer</h1></a>
        <ul class="nav justify-content-end nav-underline" id="IndexHeading">
          <li class="nav-item1" id="Login">
            <a class="nav-link" href="/login" id="LoginLink">LOGIN</a>
          </li>
        </ul>
      </div>
      <br /><br />
      <div className="loginDev1">
        <img src={login_logo} className="loginImg" />
        <div className="login_form">

          <form action="POST" onSubmit={handleSubmit}>
            <div>
              <h1 className="login">Login</h1>
            </div>
            <div>
              <label for="UserType" className="loginheading">UserType: </label><br />
              <select className="form-select-lg loginform-select" required={true} id="UserType" name="UserType" onChange={(e) => {
                setUserType(e.target.value)
              }} value={UserType} style={{ backgroundColor: "aliceblue", fontWeight: "500" }}>
                <option defaultValue >Select Type</option>
                <option value="User">User</option>
                <option value="SystemAdmin">SystemAdmin</option>
              </select>
            </div>
            <label for="email" className="loginheading">Email: </label><br />
            <input type="email" className="loginforminput" placeholder="Email" onChange={(e) => {
              setEmail(e.target.value)
            }} value={email} /><br />

            <label for="password" className="loginheading">Password: </label><br />
            <input type="password" className="loginforminput" placeholder="Password" onChange={(e) => {
              setPassword(e.target.value)
            }} value={password} /><br /><br /><br/>

            <button type="submit" className="loginsubmit">LOGIN</button><br /><br />
          </form>
        </div>
      </div>
      <br /><br /><br /><br />
      <p className='FNFooterBottom' style={{ color: "black" }}>
        © 2023 Universal Explorer All Rights Reserved.
      </p>
      <ToastContainer />
    </div>
  );
};

export default Login;
