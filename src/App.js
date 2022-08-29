import './App.css';
import {Signup} from './Pages/Signup/Signup'
import {Signin} from './Pages/Singin/Singin'
import {Routes ,Route} from 'react-router-dom'
import { useAuth } from './components/hook/UseAuth';
import { Private } from './Private';
import { useState } from 'react';
import i18n from 'i18next';
import { lang } from './Lang/lang';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {translation: lang.en},
      uz: {translation: lang.uz},
      ru: {translation: lang.ru},
    }
  });
function App() {

  
  
  const {token} = useAuth()

  if (token) {
    return <Private/>
  } 
    return(
    <div className="containerown">
      <Routes>
      <Route path='/in' element={<Signin/>}/>
      <Route path='/' element={<Signup/>}/>
    </Routes>
    </div>
    )
}

export default App;
