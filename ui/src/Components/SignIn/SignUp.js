import React, { useState } from 'react';
import UserNav from '../User/UserNav/UserNav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../User/UserNav/Header';

const SignUp = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (name.length < 5) {
      newErrors.name = 'Name must be at least 5 characters';
    }

    if (password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters';
    }

    if (address.length < 5) {
      newErrors.address = 'Address must be at least 5 characters';
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    // console.log(newErrors);
    if (Object.keys(newErrors).length === 0) {
      axios
        .post('http://localhost:8000/api/users/', {
          name: name,
          email: email,
          password: password,
          address: address
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setErrors(newErrors);
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
                <h2 className="card-title text-center">Sign Up</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="firstName">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="address"
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                    {errors.address && <div className="text-danger">{errors.address}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                  </div>

                  <p className="text-center">
                    Already have an account? <Link to="/signin" className="text-primary">Sign In</Link>
                  </p>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    style={{ backgroundColor: '#007bff' }}
                    onClick={handleSubmit}
                  >
                    Sign Up
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

export default SignUp;
