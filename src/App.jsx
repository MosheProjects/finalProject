import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import SignUp from "./components/SignUp";
import Login from './components/Login'
import ForgotPassword from "./components/ForgotPassword";
import './style/style.css'
import AddDetailes from "./components/AddDetailes";
import PersonalMainPage from "./components/PersonalMainPage";
import Footer from "./components/Footer";
import { useCurrenUserInfo } from "./Context/CurrenUserInfoContext";
import ErrNotLoggedIn from "./components/ErrNotLoggedIn";
import ChildPage from "./components/ChildPage";
import { useAuth } from "./Context/AuthContext";
import ThreeDots from "./components/ThreeDots";
import Forum from "./components/Forum";
import Article1 from "./articles/Article1"
import Article2 from "./articles/Article2"
import Article3 from "./articles/Article3"
import Article4 from "./articles/Article4"

export default function App() {
  const{currenUserInfoState} = useCurrenUserInfo();
  const { currentUser } = useAuth();

  return (
    <div >
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgotPassword" element={<ForgotPassword/>}/>
      <Route path="/user/forum" element={<Forum/>}/>

      <Route path="/article1" element={<Article1/>}/>
      <Route path="/article2" element={<Article2/>}/>
      <Route path="/article3" element={<Article3/>}/>
      <Route path="/article4" element={<Article4/>}/>

      <Route path="/addDetailes" element={(currentUser)?<AddDetailes/>:<ErrNotLoggedIn/>}/>
      <Route path="/user/main" element={(currenUserInfoState)?(<PersonalMainPage/>):((currentUser)?<ThreeDots/>:<ErrNotLoggedIn/>)}/>
      <Route path="/child/:name" element={(currenUserInfoState)?(<ChildPage/>):((currentUser)?<ThreeDots/>:<ErrNotLoggedIn/>)}/>
    </Routes>
    <Footer/>
    </div>
  )
}

//style={{minHeight:'100vh'}}