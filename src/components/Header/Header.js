import './Header.css'
import Carouselimg1 from '../../assets/img/caruselimgdefault.png'
import Carouselimg2 from '../../assets/img/caruselimg2.png'
import Avloniy from '../../assets/img/avloniy.png'
import Carouselimg3 from '../../assets/img/caruselimg3.jpg'
import lupa from '../../assets/img/lupa.png'
import Myimg from '../../assets/img/accountimg.png'
import Logo from '../../assets/img/Badiiyat.svg'
import Strelka from '../../assets/img/strelka.png'
import { NavLink,Link, Route, Routes } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../hook/UseAuth'

import { useTranslation } from 'react-i18next';

export const Header =() =>{
  const [old ,setOld] = useState([])
  const {token} = useAuth()
  const {t} = useTranslation()
  let num = 3

 

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

  const [link , setLink] = useState('')



  const [search , setSearch] = useState([])
  const [author , setAuthor] = useState([])

  const Search = useRef()

  const handleSearch = (evt) => {
    evt.preventDefault()
    axios.get(`https://book-service-layer.herokuapp.com/author/search?author=${Search.current.value}`)
    .then(function(res) {
      setAuthor(res.data);
    })
    .catch(function(err){
      console.log(err);
    })
  }

 useEffect(()=>{
  axios.get(`https://book-service-layer.herokuapp.com/author/genreId/${link ? link : 1}`)
  .then(function(res) {
    setAuthor(res.data);
  })
  .catch(function(err){
    console.log(err);
  })
 },[link])


  


  const [modal ,setModal]= useState(false) 
const handleModal =()=>{
  
  setModal(!modal)
}

  return(
    
  <div className='background'>
     <div className='header'>
        <Link className='account-logo' to={'/'}><img src={Logo} alt="" /></Link>
       <NavLink className={'account-link '} to={'/'}>{t('header.author')}</NavLink>
       <NavLink className={'account-link'} to={'/book'}>{t('header.book')}</NavLink>
       <button className='account-img'  onClick={handleModal}>{old.data && <><img className='image' src={`https://book-service-layer.herokuapp.com/${old.data.image}`} alt="" /> <img src={Strelka} alt="" /></>}</button>


       <div className={modal == false ? 'closed' : 'modalopen'}>
        <Link to={'/addbook'} className='text-light'>{t('header.addbook')}</Link>
        <Link to={'/addauthor'} className='text-light'>{t('header.addauthor')}</Link>
        <Link to={'/myaccount'} className='text-light'>{t('header.settings')}</Link>
       </div>  
   </div>

   <div id="carouselExampleIndicators"  className="carousel slide mt-5" data-bs-ride="carousel">
  <div className="carousel-indicators carusel-changer">
    <button type="button "  data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"  className="active changer1" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" className='changer1' data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button " className='changer1' data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button " className='changer1' data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 3"></button>
  </div>
  <div  className="carousel-inner  text-center">
    <div  className="carousel-item active">
    <img width={1200} height='300' src={Carouselimg1} alt="" />
    </div>
    <div  className="carousel-item">
    <img width={1200} height='300' className='carusel-img'  src={Carouselimg2} alt="" />
    </div>
    <div  className="carousel-item">
    <img width={1200} height='300'  className='carusel-img' src={Carouselimg3} alt="" />
    </div>
    <div  className="carousel-item">
    <img width={1200} height='300'  className='carusel-img' src={Carouselimg3} alt="" />
    </div>
  </div>
  <button  className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span  className="visually-hidden">Previous</span>
  </button>
  <button  className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span  className="visually-hidden">Next</span>
  </button>
</div>


<div className='searching'>
  <p className='searching-text'>{t('search.search')}</p>
  <form className='d-flex author-search' onSubmit={handleSearch}>
    <input ref={Search} type="text" className='searching-input' placeholder={t('search.inputvalue')} />
  <button className='searching-button d-flex '> <img src={lupa} alt="" />  {t('search.search2')}</button>
  </form>
</div>


<div className='author-type-changer'>
  <p className='author-type-title'>{t('main.category')}</p>
<div className='author-type' > 
  <button className='author-type-button' value='1' onClick={((evt) => setLink(evt.target.value))}>Temuriylar  {t('main.davri')}</button>
  <button className='author-type-button' value='2' onClick={((evt) => setLink(evt.target.value))}>Jadid {t('main.davri')}</button>
  <button className='author-type-button' value='3' onClick={((evt) => setLink(evt.target.value))}>Sovet {t('main.davri')} </button>
  <button className='author-type-button' value='4' onClick={((evt) => setLink(evt.target.value))}>Mustaqillik {t('main.davri')}</button>
</div>
</div>


<div>
  { 
 author.length &&  <ul className='author-list'>
    {author.length && author.map((e)=>{
      return <li className='author-item ' key={e.id}>
        <Link className='single-link' to={`/singleauthor/${e.id}`} >
        <img  width={173} height='132' src={(`https://book-service-layer.herokuapp.com/${e.image}`)} onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSpK6TUoN45wegVKWvmBywudI9nQd9p9jVaQ&usqp=CAU";
        }} className='mb-3 author-img' alt="image of author" />
        <p className='author-name px-2' width='150' >{e.first_name}  {e.last_name}</p>
        <p className='author-date'>{e.date_of_birth}-{e.date_of_death}</p>
        </Link>
      </li>
    })}
  </ul> }
</div>
   
  </div>
  )
}