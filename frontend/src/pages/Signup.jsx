import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/authApi';
import '../css/Signup.css'; // Import your signup.css file

const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      toast.success('Society registered!');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('socId', res.data.result._id);
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  const password = watch('password', '');

  return (
    <div className="signup-page">
      <h2 className="signup-heading">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <div className="form-field">
          <input
            type="text"
            placeholder="Enter your name"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters long',
              },
            })}
            className="input-field"
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>
        <div className="form-field">
          <input
            type="email"
            placeholder="Enter your email"
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
            placeholder="Create your password"
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
        <div className="form-field">
          <input
            type="password"
            placeholder="Confirm your password"
            {...register('confirmPassword', {
              validate: (value) =>
                value === password || 'The passwords do not match',
            })}
            className="input-field"
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword.message}</span>
          )}
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default SignUpForm;
