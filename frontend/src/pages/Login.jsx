import { useForm } from 'react-hook-form';
import '../css/Login.css';
import { loginUser } from '../../api/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
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

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      toast.success('Logged in!');
      localStorage.setItem('soc-token', res.data.token);
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <div className='login-page'>
      <h2 className='heading'>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form11'>
          {/* <label>Email:</label> */}
          <input
            className='email1'
            type='email'
            placeholder='Enter Email'
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
            className='password1'
            type='password'
            placeholder='Enter Password'
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
        <button className='button1' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
