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
      <Route path="/addDetailes" element={(currentUser)?<AddDetailes/>:<ErrNotLoggedIn/>}/>
      <Route path="/user/main" element={(currenUserInfoState)?(<PersonalMainPage/>):((currentUser)?<ThreeDots/>:<ErrNotLoggedIn/>)}/>
      <Route path="/child/:name" element={(currenUserInfoState)?(<ChildPage/>):((currentUser)?<ThreeDots/>:<ErrNotLoggedIn/>)}/>
    </Routes>
    <Footer/>
    </div>
  )
}

//style={{minHeight:'100vh'}}