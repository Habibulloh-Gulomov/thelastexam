
import {Link} from 'react-router-dom'
import './Addauthor.css'
import Avloniy from '../../assets/img/avloniy2.png'
import axios from 'axios'
import { useAuth } from '../../components/hook/UseAuth'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
export const AddAuthor =()=>{
  const {t} = useTranslation()
  const {token} = useAuth()
  const [img ,SetImg] = useState(null)
 

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const formData =  new FormData()
    const [first_name, last_name , date_of_birth, date_of_death, country , bio,image , genre_id] = evt.target.elements

     console.log(evt.target.elements[6].value);
    formData.append('first_name',first_name.value)
    formData.append('last_name',last_name.value)
    formData.append('date_of_birth',date_of_birth.value)
    formData.append('date_of_death',date_of_death.value)
    formData.append('country',country.value)
    formData.append('bio',bio.value)
    formData.append('genre_id',Number(genre_id.value))
    formData.append('image',image.files[0])
    axios.post('https://book-service-layer.herokuapp.com/author',formData , {
      headers: {
        'Authorization': token.data.token
      }}
    ).then(function(response){
      console.log(response);
    })
    .catch(function(err){
      console.log(err);
    })

  };




  return(
   <div className='d-flex signup author-post'>
     <div className='signup-register d-flex author-post'>
     <div className='author-postimg'>
     <img src={Avloniy} alt="" />
     <p className='signup-title fs-3 mt-2'>Ulug'bek hazinasi</p>
     </div>
       <form className='form author-post-right' onSubmit={((evt) => handleFormSubmit(evt))}>
       <h2 className='signup-title'>{t('adding.addauthor')}</h2>
        <input name='first_name'  type="text"  className='signup-input'  placeholder={t('profile.name')} required/>
        <input name='last_name'  type="text" className='signup-input'  placeholder={t('profile.surname')} required/>
        <input name='date_of_birth' type="text" className='signup-input' placeholder={t('author.birth')} required/>
        <input name='date_of_death' type="text" className='signup-input' placeholder={t('author.death')} required/>
        <input name='country' type="text" className='signup-input' placeholder={t('adding.Country')} required/>
        <textarea name='bio' height={85} type="text" className='signup-input' placeholder={t('adding.Description')}  required/>
        
        <label className='label text-center register'>{t('adding.img')}<input   required name='image' type="file" className=' uploadimg'  placeholder='upload img'/></label>
       <select name="genre_id" className='signup-input'  required>
        <option >{t('book.genre')}</option>
        <option value="1">Temuriylar davri </option>
        <option value="2">Jadid adabiyoti  </option>
        <option value="3">Sovet davri  </option>
        <option value="4">Mustaqillik davri </option>
       </select>
        <button className='register' type='submit'>{t('adding.create')}</button>
       </form>
    </div>
   </div>
  )
}