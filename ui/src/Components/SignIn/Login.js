import React, { useState } from 'react';
import UserNav from '../User/UserNav/UserNav';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../User/UserNav/Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/users/signin', {
        email: email,
        password: password,
      });

      if (response.status === 201) { // Check the status code
        console.log(response);
        var str = response.data;
        const arr = str.split(" ");
        const role = arr[0];
        const userId = arr[1];
        // console.log(arr[0]);

        if(role === "user"){
          localStorage.setItem('role', 'user');
          localStorage.setItem('userId',`${userId}`);
          // console.log(userId);
          navigate('/')
        }else if(role === "admin"){
          localStorage.setItem('role', 'admin');
          
          navigate('/admin')
          window.location.reload();
        }
        // Set login success state
        setLoginSuccess(true);
        // navigate('/');
      } else {
        // Handle unsuccessful login, e.g., show an alert
        setUserNotFound(true);
      }
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an alert
    }
  };

  return (
    <div>
      {/* <UserNav /> */}
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Login</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {userNotFound && (
                    <div className="alert alert-danger" role="alert">
                      User not found. Please check your email and password.
                    </div>
                  )}
                  {loginSuccess && (
                    <div className="alert alert-success" role="alert">
                      Login successful. Redirecting to the home page.
                    </div>
                  )}
                  <p className="text-center">
                    Don't have an account? <Link to="/signup" className="text-primary">Sign up</Link>
                  </p>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    style={{ backgroundColor: '#007bff' }}
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
