import accountimg from '../../../assets/img/accountimgbig.png'
import camera from '../../../assets/img/Camera.png'
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import '../Myaccount/Myaccount.css'
import { useAuth } from '../../../components/hook/UseAuth'
import { useEffect, useRef, useState } from 'react'
export const Newdata =()=>{
  const {t} = useTranslation()
  const {token, setToken} = useAuth()



  const [old, setOld] = useState([])
  let num =3
 console.log(old);
  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const formData =  new FormData()
    const [email, currentPassword , newPassword ,newPasswordcheck] = evt.target.elements
    

    formData.append('email',email.value)
    formData.append('currentPassword',currentPassword.value)
    formData.append('newPassword',newPassword.value )
    axios.put('https://book-service-layer.herokuapp.com/user/security' , formData , {
      headers:{
        'Authorization': token.data.token
      }
    }
    ).then(function(response){
      console.log(response);
    })
    .catch(function(err){
      console.log(err);
    })

  };

  useEffect(()=>{
    axios.get('https://book-service-layer.herokuapp.com/user/me' , {
    headers:{
      'Authorization': token.data.token
    }
  }
  ).then(function(response){
    setOld(response);
  })
  .catch(function(err){
    console.log(err);
  })
  } , [num])

  return(
    <div>
     <div className='settinglinks'>
    <NavLink className='setting-link' to={'/myaccount'}> <span className='setting-link-num'>1</span> My account</NavLink>
    <NavLink className='setting-link' to={'/newdata'}> <span className='setting-link-num'>2</span> Security</NavLink>
    <NavLink className='setting-link' to={'/modechange'}> <span className='setting-link-num'>3</span> Mode setting</NavLink>
    </div>
     <div className='d-flex mt-5'>
     <div className='myaccount-old myaccount-old-margin'>
      <h2 className='myaccount-title'>Change Or Recover Your Password:</h2>
      {old.data &&
      <form className='myaccount-form ' onSubmit={((evt) => handleFormSubmit(evt))}>        
          <label className='myaccount-form myaccount-label' >Email<input  name='email' defaultValue={old.data.email}  type="text"  className='myaccount-newdata' /> <span className='myaccount-warn'>{t('profile.check')}</span></label>
          <label className='myaccount-form myaccount-label' >{t('profile.codeold')}<input  name='currentPassword' placeholder='your old password'  type="password" className='myaccount-newdata' /> <span className='myaccount-warn'>Please enter your password.</span></label>
          <div className='d-flex'>
          <label className='myaccount-form myaccount-label '>{t('profile.codenew')}<input  name='newPassword' type="password"  className='myaccount-newdata w-340' placeholder='New Password'/> <span className='myaccount-warn'>Please enter your  new password.</span></label>
          <label  className='myaccount-form myaccount-label '>{t('profile.codenew')}<input  name='newPassword' type="password"  className='myaccount-newdata w-340' placeholder='New Password'/> <span className='myaccount-warn'>Please enter your  new password.</span></label>
          </div>
        
         <span className='myaccount-long-line'></span>
          <button className='myaccount-register' type='submit'>{t('profile.save')}</button>   
       </form>
}
    </div>
   </div>
  </div>
  )
}