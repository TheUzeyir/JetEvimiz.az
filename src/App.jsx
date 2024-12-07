import CategoryBox from './components/categoryBox/CategoryBox'
import AboutPage from './page/about/AboutPage'
import Contack from './page/about/Contack'
import Faq from './page/about/Faq'
import Info from './page/about/Info'
import Rules from './page/about/Rules'
import TermCondition from './page/about/TermCondition'
import DetailPage from './page/detailPage/DetailPage'
import LikedPage from './page/liked/LikedPage'
import Main from './page/main/Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewProductAdd from './page/newProductAdd/NewProductAdd'
import LogIn from './page/login/Login'
import SignUp from './page/login/SignUp'
import CategoryProduct from './page/categoryProduct/CategoryProduct'
import './translate/i18n'
import NawBarResponsive from './components/navBarResponsive/NawBarResponsive'
import ProfilePageExpired from './page/profile/ProfilePageExpired'
import ProfilePageUnpublished from './page/profile/ProfilePageUnpublished'
import ProfilePageWaiting from './page/profile/ProfilePageWaiting'
import ProfilePageCurrently from './page/profile/ProfilePageCurrently'
import ProfilePage from './page/profile/ProfilePage'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/info' element={<Info />} />
        <Route path='/rules' element={<Rules />} />
        <Route path='/termcondition' element={<TermCondition />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/contack' element={<Contack />} />
        <Route path='/product-details/:id' element={<DetailPage />} />
        <Route path='/likedPage' element={<LikedPage />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/categoryBox' element={<CategoryBox />} />
        <Route path='/CategoryProduct' element={<CategoryProduct />} />
        <Route path='/headerBox' element={<NawBarResponsive />} />
        <Route path='/yeniElan' element={<NewProductAdd />} />
        <Route path='/profil' element={<ProfilePage />} />
        <Route path='/ProfilePageExpired' element={<ProfilePageExpired />} />
        <Route path='/ProfilePageUnpublished' element={<ProfilePageUnpublished />} />
        <Route path='/ProfilePageWaiting' element={<ProfilePageWaiting />} />
        <Route path='/ProfilePageCurrently' element={<ProfilePageCurrently />} />
      </Routes>
    </Router>
  )
}

export default App;
