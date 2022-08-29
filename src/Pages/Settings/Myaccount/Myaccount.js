import accountimg from '../../../assets/img/accountimgbig.png'
import camera from '../../../assets/img/Camera.png'
import './Myaccount.css'
import { useTranslation } from 'react-i18next';
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../../components/hook/UseAuth'
import { useEffect, useState } from 'react'
export const Myaccount =()=>{
  const {t} = useTranslation()
  const {token} = useAuth()
  const [old, setOld] = useState([])
  let num =3
 console.log(old);
  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const formData =  new FormData()
    const [first_name, last_name , phone, image] = evt.target.elements
    

    formData.append('first_name',first_name.value)
    formData.append('last_name',last_name.value)
    formData.append('phone',phone.value)
    formData.append('image',image.files[0])
    axios.put('https://book-service-layer.herokuapp.com/user/account' , formData , {
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

},[num])
  return(
    <div>
    { old.data &&
    <div>
    <div className='settinglinks'>
    <NavLink className='setting-link' to={'/myaccount'}> <span className='setting-link-num'>1</span> {t('profile.myprofile')}</NavLink>
    <NavLink className='setting-link' to={'/newdata'}> <span className='setting-link-num'>2</span> {t('profile.secure')}</NavLink>
    <NavLink className='setting-link' to={'/modechange'}> <span className='setting-link-num'>3</span> {t('profile.theme')}</NavLink>
    </div>
     <div className='d-flex mt-5'>
    <img className='myaccount-img' src={`https://book-service-layer.herokuapp.com/${old.data.image}`} width='175' height={175} alt="" />
    
     <div className='myaccount-old'>
      <h2 className='myaccount-title'>{t('profile.myprofile')}</h2>
       <form className='myaccount-form' onSubmit={((evt) => handleFormSubmit(evt))}>        
          <label className='myaccount-form myaccount-label' >{t('profile.name')}<input  name='first_name' defaultValue={old.data.first_name}  type="text"  className='myaccount-newdata'  placeholder='First name'/> <span className='myaccount-warn'>Please enter your first name.</span></label>
          <label className='myaccount-form myaccount-label' >{t('profile.surname')}<input  name='last_name' defaultValue={old.data.last_name}  type="text" className='myaccount-newdata'  placeholder='Last name'/> <span className='myaccount-warn'>Please enter your last name.</span></label>
          <label className='myaccount-form myaccount-label'>{t('profile.phone')}<input  name='phone' type="number" defaultValue={old.data.phone} className='myaccount-newdata' placeholder='Phone'/> <span className='myaccount-warn'>Please enter your  phone number.</span></label>
         <label className='camera'> <img src={camera} alt="" /> <input name='image' type="file" className='d-none' placeholder='Phone'/></label>
         <span className='myaccount-long-line'></span>
          <button className='myaccount-register' type='submit'>{t('profile.save')}</button>   
       </form>
    </div>
   </div>
  </div>
}
</div>
  )
}