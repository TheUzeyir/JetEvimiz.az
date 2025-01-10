import React, { useEffect ,useState} from "react";
import { useLocation } from "react-router-dom";
import HeaderTop from './HeaderTop/HeaderTop';
import HeaderBottom from './HeaderBottom/HeaderBottom';
import Navbar from './DesktopNavbar/Navbar';
import HeaderSliders from '../../components/slider/headerSliders/HeaderSliders';
import AutoPlay from '../../components/slider/autoplayslider/AutoPlaySlider';

export default function Header() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 968);

  useEffect(() => {
    // Ekran boyutunu izleyin
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 968);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Ana sayfa kontrolü
    if (location.pathname === "/" && isMobile) {
      document.body.classList.add("homePageMobile"); // Ana sayfa ve mobile için class ekle
    } else {
      document.body.classList.remove("homePageMobile"); // Diğer sayfalarda class'ı kaldır
    }
  }, [location, isMobile]);

  return (
    <header className='header'>
      <HeaderTop/>
      <Navbar/>
      <HeaderBottom/>
      <HeaderSliders/> 
      <AutoPlay/>
    </header>
  );
}
