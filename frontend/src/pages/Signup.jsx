import { useForm } from 'react-hook-form';
import '../css/Signup.css';
import { registerUser } from '../../api/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      toast.success('Society registered!');
      localStorage.setItem('soc-token', res.data.token);
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  const password = watch('password', '');

  return (
    <div className='signup-page'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* <label>Name:</label> */}
          <input
            className='namee'
            type='text'
            placeholder='Enter your name'
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters long',
              },
            })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          {/* <label>Email:</label> */}
          <input
            className='emaill'
            type='email'
            placeholder='Enter your email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          {/* <label>Password:</label> */}
          <input
            className='passwordd'
            type='password'
            placeholder='Create your password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
                message:
                  'Password must contain at least one uppercase letter and one special symbol',
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          {/* <label>Confirm Password:</label> */}
          <input
            className='passs'
            type='password'
            placeholder='Confirm your password'
            {...register('confirmPassword', {
              validate: (value) =>
                value === password || 'The passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>
        <button className='buttonn' type='submit'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
