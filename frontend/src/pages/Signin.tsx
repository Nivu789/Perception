import { useEffect } from 'react'
import Auth from '../components/Auth'
import { Quote } from '../components/Quote'
import {  useNavigate } from 'react-router-dom'
import {  useSetRecoilState } from 'recoil'
import { authState  } from '../atoms/authAtom'


const Signin = () => {
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState(true);
      navigate('/blogs', { replace: true });
    }
  }, [navigate, setAuthState]);

console.log("Login rendered")

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <div>
        <Auth type='Sign in'/>
      </div>
      <div className='hidden lg:block'>
        <Quote/>
      </div>
    </div>
  )
}

export default Signin