import { useTranslation } from 'react-i18next';
import {Link} from 'react-router-dom'
import './Addauthor.css'
import { AddAuthor } from './Addauthor'
import ulugbekbook from '../../assets/img/ulugbekbook.png'
import axios from 'axios'
import { useAuth } from '../../components/hook/UseAuth'
import { useEffect, useRef, useState } from 'react'
export const Addbook =()=>{
  const {t} = useTranslation()

  const {token} = useAuth()
  const [link , setLink] = useState('')

  const [authors , setAuthors] = useState([])
  

  useEffect(()=>{
    axios.get(`https://book-service-layer.herokuapp.com/author/genreId/${link }`)
    .then(function(res) {
      setAuthors(res.data);
    })
    .catch(function(err){
      console.log(err);
    })
   },[link])
  

  console.log(authors);

  
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
   
   
    const formData =  new FormData()
    const [title, page , year, price,  genre_id,author_id , description ,image] = evt.target.elements

     console.log(image);

    formData.append('title',title.value)
    formData.append('page',page.value)
    formData.append('year',year.value)
    formData.append('price',price.value)
    formData.append('genre_id', Number(genre_id.value))
    formData.append('author_id',Number(author_id.value))
    formData.append("description", description.value)
    formData.append('image',image.files[0])
    
    axios.post('https://book-service-layer.herokuapp.com/book',formData , {
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
     <div className='author-postimg pt-3'>
     <img src={ulugbekbook} alt="ulugbekbook" width={300} height='485' className='ulugbekbook' />
     <p className='signup-title fs-3 mt-2'>Ulug'bek hazinasi</p>
     </div>
       <form className='form author-post-right' onSubmit={((evt) => handleFormSubmit(evt))}>
       <h2 className='signup-title'>{t('adding.addbook')}</h2>
        <input name='title'  type="text"  className='signup-input'  placeholder={t('adding.title')}  required/>
        <input name='page'  type="number" className='signup-input'  placeholder={t('adding.Pages')} required/>
        <input name='year' type="text" className='signup-input' placeholder={t('adding.Year')} required/>
        <input name='price' type="text" className='signup-input' placeholder={t('adding.Price')} required/>
        <select name="genre_id" className='signup-input' onChange={((evt) => setLink(evt.target.value))} required>
        <option >{t('book.genre')}</option>
        <option value="1">Temuriylar davri </option>
        <option value="2">Jadid adabiyoti  </option>
        <option value="3">Sovet davri  </option>
        <option value="4">Mustaqillik davri </option>
       </select>
       <select name='author_id' className='signup-input' required>
        <option >{t('adding.Author')}</option>
        {authors.length && authors.map((e)=>{
          return(
            
          <option value={e.id}>{e.first_name} {e.last_name}</option>
          
          )
        })}
        </select>
        <textarea required name="description"  type="text" className='signup-input' placeholder={t('adding.Description')}/>
        
        <label className='label2 text-center register'>{t('adding.img')}<input required name='image' type="file" className=' uploadimg'  placeholder='upload img'/></label>
      
        <button className='register' type='submit'>{t('adding.create')}</button>
       </form>
    </div>
   </div>
  )
}