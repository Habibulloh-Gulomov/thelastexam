import { Route, Routes } from "react-router-dom"
import { Header } from "./components/Header/Header"
import { AddAuthor } from "./Pages/AddBook/Addauthor"
import { Addbook } from "./Pages/AddBook/Addbook"
import { Book } from "./Pages/book/Book"
import { SingleAuthor } from "./Pages/SingleAuhtor/SingleAuthor"
import { Singlebook } from "./Pages/Singlebook/Singlebook"
import {Myaccount} from './Pages/Settings/Myaccount/Myaccount'
import { Newdata } from "./Pages/Settings/Newdata/Newdata"
import { Mode } from "./Pages/Settings/Mode/Mode"

export const Private =() =>{
  return(
   <div className="containerown">
     <Routes>
      <Route path="/" element={<Header/>}/>
      <Route path="/book" element={<Book/>}/>
      <Route path="/addauthor" element={<AddAuthor/>}/>
      <Route path="/addbook" element={<Addbook/>}/>
      <Route path="/singleauthor/:id" element={<SingleAuthor/>}/>
      <Route path="/singlebook/:id" element={<Singlebook/>}/>
      <Route path="/myaccount" element={<Myaccount/>}/>
      <Route path="/myaccount" element={<Myaccount/>}/>
      <Route path="/newdata" element={<Newdata/>}/>
      <Route path="/modechange" element={<Mode/>}/>
      
     </Routes>
   </div>
  )
}