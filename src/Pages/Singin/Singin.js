import Signinimg from '../../assets/img/signin.png'
import '../Signup/Signup.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../components/hook/UseAuth';
export const Signin =()=>{

  const {token, setToken} = useAuth()
 
  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const formData =  new FormData()
    const [ email, password] = evt.target.elements


    formData.append('email',email.value)
    formData.append('password',password.value)
    axios.post('https://book-service-layer.herokuapp.com/user/login',formData
    ).then(function(response){
      setToken(response);
    })
    .catch(function(err){
      console.log(err);
    })

  };




  return(
   <div className='d-flex signup'>
    <div className='singup-img-back'>
      <img className='signup-img' width={500} height='500' src={Signinimg} alt="img" />
    </div>
     <div className='signup-register'>
      <h2 className='signup-title'>Sign in</h2>
       <p className='signup-warn'> Already have an account? <Link  className='signup-link' to={'/'}>Sign up</Link></p>
       <form className='form' onSubmit={((evt) => handleFormSubmit(evt))}>
        <input  className='signup-input'  name='email' type="email"  placeholder='Email'/>
        <input  className='signup-input'  name='password' type="password"  placeholder='Password'/>
        <button className='register' type='submit'>Next step</button>
       </form>
       
    </div>
   </div>
    
  )
}