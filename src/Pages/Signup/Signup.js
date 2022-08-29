import './Signup.css'
import Signupimg from '../../assets/img/signup.png'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../components/hook/UseAuth'
export const Signup =()=>{
  const {token, setToken} = useAuth()

  

 
  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const formData =  new FormData()
    const [first_name, last_name , phone, email, password] = evt.target.elements


    formData.append('first_name',first_name.value)
    formData.append('last_name',last_name.value)
    formData.append('phone',phone.value)
    formData.append('email',email.value)
    formData.append('password',password.value)
    axios.post('https://book-service-layer.herokuapp.com/user/register',formData
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
      <img className='signup-img' width={500} height='500' src={Signupimg} alt="" />
    </div>
     <div className='signup-register'>
      <h2 className='signup-title'>Sign up</h2>
       <p className='signup-warn'>Already have an account? <Link className='signup-link' to={'/in'}>Sign in</Link></p>
       <form className='form' onSubmit={((evt) => handleFormSubmit(evt))}>
        <input name='first_name'  type="text"  className='signup-input'  placeholder='First name'/>
        <input name='last_name'  type="text" className='signup-input'  placeholder='Last name'/>
        <input name='phone' type="text" className='signup-input' placeholder='Phone'/>
        <input name='email' type="email" className='signup-input' placeholder='Email'/>
        <input name='password' type="password" className='signup-input' placeholder='Password'/>
        <button className='register' type='submit'>Next step</button>
       </form>
    </div>
   </div>
  )
}