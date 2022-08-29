import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../Myaccount/Myaccount.css'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
export const Mode = ()=>{
  const {t} = useTranslation()

const handlepost = (e)=>{
  e.preventDefault()
}

const [modal ,setModal] =['false']
const handlechanger = ()=>{
  if(modal == 'false'){
    return modal == 'true'
  }if(modal =='true'){
    return modal == 'false'
  }

  console.log(modal);
}

console.log(modal);  

  return(
    <div>
     <div className='settinglinks'>
    <NavLink className='setting-link' to={'/myaccount'}> <span className='setting-link-num'>1</span> {t('profile.myprofile')}</NavLink>
    <NavLink className='setting-link' to={'/newdata'}> <span className='setting-link-num'>2</span> {t('profile.secure')}</NavLink>
    <NavLink className='setting-link' to={'/modechange'}> <span className='setting-link-num'>3</span> {t('profile.theme')}</NavLink>
    </div>

   <div className='myaccount-old  myaccount-old-margin'>
   <h2 className='myaccount-title'>{t('profile.setting')}</h2>
   <form className='myaccount-form' onSubmit={handlepost}>        
          <label className='myaccount-form myaccount-label' >{t('profile.lang')}
          <select className='myaccount-newdata' onChange={((evt)=> i18next.changeLanguage(evt.target.value))} >
            <option value="en">english</option>
            <option value="uz">uzbek</option>
            <option value="ru">russian</option>
            </select></label>
          
         <button className={modal == 'false' ? 'dark-mode ps-5' : 'dark-mode pe-5'} onKeyUp={(()=>handlechanger())}  > <span className='dark-mode-circle'></span></button>
         <span className='myaccount-long-line'></span>


          <button disabled className='myaccount-register mr-400' type='submit'>{t('profile.save')}</button>   
       </form>
   </div>
    </div>
  )
}