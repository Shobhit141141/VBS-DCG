import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../css/Login.css';
import { Toaster,toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authApi';
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      navigate("/")
      toast.success('Logged in!');
     
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.result.name); 
      localStorage.setItem('socId',response.data.result._id)
    window.location.reload();

   
      
  
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-page">
      <h2 className="heading">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-field">
          <input
            type="email"
            placeholder="Enter Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="input-field"
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>
        <div className="form-field">
          <input
            type="password"
            placeholder="Enter Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            className="input-field"
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>
        
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
