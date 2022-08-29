import axios from "axios";
import './Singlebook.css'
import star from '../../assets/img/star.png'
import like from '../../assets/img/like.png'
import share from '../../assets/img/share.png'
import headphone from '../../assets/img/Frame.png'
import phone from '../../assets/img/phone.png'
import blockquote from '../../assets/img/blockquet.png'
import book from '../../assets/img/Vector.png'
import '../SingleAuhtor/SingleAuthor.css'
import '../../components/Header/Header.css'
import Logo from '../../assets/img/Badiiyat.svg'
import Mark from '../../assets/img/mark.png'
import Strelka from '../../assets/img/strelka.png'
import Myimg from '../../assets/img/accountimg.png'
import { useEffect, useState } from "react";
import {NavLink, Link, useParams } from "react-router-dom";
import { useAuth } from "../../components/hook/UseAuth";
import { t } from "i18next";


export let Singlebook = ()=>{
  const {token} = useAuth()
  const { id } = useParams();
  const [single , setSingle] = useState({})
  const [books , setBooks] = useState([])
  console.log(single);

let num =3
  useEffect(()=>{
    axios.get(`https://book-service-layer.herokuapp.com/book/bookId/${id}` , {
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
  




 useEffect(()=>{
  axios.get(`https://book-service-layer.herokuapp.com/book/genreId/2` , {
    headers: {
      'Authorization': token.data.token
    }})
  .then(function(res){
    setBooks(res.data);
  })
  .catch(function(err){
    console.log(err);
  })
 } , [num])

  const [modal ,setModal]= useState(false) 
  const handleModal =()=>{
    
    setModal(!modal)
  }
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
   
      {single.data && <div className="d-flex book-main">
        <img className="single-bookimg" src={`https://book-service-layer.herokuapp.com/${single.data.image}`} 
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSpK6TUoN45wegVKWvmBywudI9nQd9p9jVaQ&usqp=CAU";
        }} alt="" />


        <div className="main-info m-0">
        <p className="main-name">{single.data.title}</p>
        <p className="singlebook-author">Javlon Jovliyev <span className="text-light mx-2">|</span> <img src={star} alt="" />   4.1</p>
        <p className="book-item-value"> <span className="book-item">{t('book.page')}</span> {single.data.page}</p>
        <p className="book-item-value"> <span className="book-item">{t('book.year')}</span> {single.data.year}</p>
        <p className="book-item-value"> <span className="book-item">{t('book.genre')}</span> {single.data.genre_id == 1 ? 'Tarixiy' :null } {single.data.genre_id == 2 ? 'Jadidchilik' :null } {single.data.genre_id == 3 ? 'Sovet' :null } {single.data.genre_id == 4 ? 'Yangi davr' :null }</p>
        <p className="book-item-value"> <span className="book-item">{t('book.nash')}</span>Nihol nashr</p>
        <p className="singlebook-author d-flex ">{t('book.more')} <span className="text-light ms-3">⬇</span> <span className="the-long-line"></span></p>
        <p className="book-des">{single.data.description}</p>
        <div>
          <p className="singlebook-author">Mavjud formatlar</p>
          <div className="book-electro">
            <div className="book-electr">
              <img src={book} alt="" />
              <p className="book-electr-item">{t('book.type')}</p>
              <p className="book-electr-price">{single.data.price}$</p>
            </div>
            <div className="book-electr">
              <img src={headphone} alt="" />
              <p className="book-electr-item">{t('book.type2')}</p>
              <p className="book-electr-price">6:23 soat</p>
            </div>
            <div className="book-electr">
              <img src={phone} alt="" />
              <p className="book-electr-item">{t('book.type3')}</p>
              <p className="book-electr-price">pdf, epub</p>
            </div>
            <button className="javon">{t('book.javon')}</button>
          </div>
        </div>

        </div>
      </div> }
      
  <div className="iqtibos-box">
    <Link className="iqtibos-link" to={``}>{t('book.aboutauthor')}</Link>
    <Link className="iqtibos-link" to={``}>{t('book.iqtibos')}</Link>
    <Link className="iqtibos-link" to={``}>{t('book.booklover')}</Link>
  </div>
      <div className="d-flex blockquote-box">
        <blockquote className="blockquote"> <img className="blockquote-img" src={blockquote} alt="" /> Inson bolasi ne kunlarni ko‘rmaydi?!
Har bir odam o‘z g‘ami bilan bo‘lsa, hayotdan ko‘z yumib ketganlarga umr bo‘yi motam tutib o‘tsa, bu moddiy olam shu kunlarga yetolarmidi?
Hayot to‘lqini ojizlarni qirg‘oqqa irg‘itib tashlaydi. Oqimga qarshi suza olganlar, to‘lqinni egarlaganlargina ertangi kunga yetib keladi.</blockquote>

<img className="ms-3 me-2 text-bottom like" src={like} width='19' height={19} alt="" />
<img className="like" src={share} width='17' height={18} alt="" />
        <blockquote className="blockquote"><img className="blockquote-img" src={blockquote} alt="" />
        Yer kurrasida chumolidek mehnat qilayotganlardan ko‘ra, tuproq tagida yotganlar ko‘p. Yer qatlami odam suyaklariga to‘lib ketgan.
        </blockquote>
      </div>


      <div width={1250}>
          <div className="author-write1 d-flex" width='1250'> 
            <p className="author-asar1 fs-5 ">{t('book.maybe')}</p>
            <Link className="author-movelink" to={'/book'}>{t('author.all')}</Link>
          </div>
          <ul className="author-list mt-2 pb-5">
            {books.length ? books.map((e) => {
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
                <p  className="star"><img src={star} alt="star" /> 4.3 • 300 ta fikrlar</p>
              </li>
              )  
            }): <p className="nothing">hech nima yoq</p> }
          </ul>
        </div>
    </div>
  )
}