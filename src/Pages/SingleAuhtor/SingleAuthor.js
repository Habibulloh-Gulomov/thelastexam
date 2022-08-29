import axios from "axios";
import './SingleAuthor.css'
import { useTranslation } from 'react-i18next';
import '../../components/Header/Header.css'
import Logo from '../../assets/img/Badiiyat.svg'
import Mark from '../../assets/img/mark.png'
import Strelka from '../../assets/img/strelka.png'
import Myimg from '../../assets/img/accountimg.png'
import { useEffect, useState } from "react";
import {NavLink, Link, useParams } from "react-router-dom";
import { useAuth } from "../../components/hook/UseAuth";


export let SingleAuthor = ()=>{
  const {t} = useTranslation()
  const {token} = useAuth()
  const { id } = useParams();

  const [single , setSingle] = useState({})
  const [books , setBooks] = useState([])


  useEffect(()=>{
    axios.get(`https://book-service-layer.herokuapp.com/author/authorId/${id}` , {
    headers: {
      'Authorization': token.data.token
    }})
  .then(function(res){
    setSingle(res);
  })
  .catch(function(err){
    console.log(err);
  })
  } , [])


  axios.get(`https://book-service-layer.herokuapp.com/author/books/${id}` , {
    headers: {
      'Authorization': token.data.token
    }})
  .then(function(res){
    setBooks(res.data);
  })
  .catch(function(err){
    console.log(err);
  })

  const [modal ,setModal]= useState(false) 
  const handleModal =()=>{
    
    setModal(!modal)
  }

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
  const [old,setOld] =useState([])
  
  return(
    <div className="background2">
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
      {single.data && <div className="d-flex">
        <div className="author-img-text">
        <img className="single-img" src={`https://book-service-layer.herokuapp.com/${single.data.image}`} 
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSpK6TUoN45wegVKWvmBywudI9nQd9p9jVaQ&usqp=CAU";
        }} alt="" />

        <div className="d-flex author-info">
          <div>
            <p className="author-birth" >{t('author.birth')}</p>
            <p className="single-date">{single.data.date_of_birth}</p>
            <p className="author-city">{single.data.country}</p>
          </div>
          <p className="line"> -</p>
          <div>
            <p className="author-birth">{t('author.death')}</p>
            <p className="single-date">{single.data.date_of_death}</p>
            <p className="author-city">{single.data.country}</p>
          </div>
          
        </div>
        </div>


        <div className="main-info">
        <p className="main-name">{single.data.first_name} {single.data.last_name}</p>
        <p className="main-more">{single.data.bio}</p>

        <p className="Mark"> <img src={Mark} alt="" /> Ijodi</p>
        <p className="Mark-text">Yozuvchining ilk asari 1962-yilda „Poʻlat chavandoz“ nomida ocherklar toʻplami tarzida nashrdan chiqdi. Ammo yozuvchiga muvaffaqiyat keltirgan asar 1970-yilda nashr qilingan „Bahor qaytmaydi“ qissasi boʻldi.</p>



        <div>
          <div className="author-write d-flex">
            <p className="author-asar">Asarlari</p>
            <Link className="author-movelink" to={'/book'}>Barchasini ko’rish</Link>
          </div>
          <ul className="author-list mt-3">
            {books.length ? books.map((e)=>{
              return(
                <li  className='book-item ' key={e.id}>
                <img className='book-img mb-3' src={'https://book-service-layer.herokuapp.com/'+e.image} 
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://image.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg";
                }}
                alt="image of book" />
                <p className='author-book px-2' width='150' >{e.title}  </p>
              </li>
              )  
            }): <p className="nothing">Hech nima topilmadi😌</p> }
          </ul>
        </div>
        </div>

       
      
        
      </div> }
    </div>
  )
}