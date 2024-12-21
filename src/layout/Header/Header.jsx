import React from 'react';
import HeaderTop from './HeaderTop/HeaderTop';
import HeaderBottom from './HeaderBottom/HeaderBottom';
import Navbar from './DesktopNavbar/Navbar';
import HeaderSliders from '../../components/slider/headerSliders/HeaderSliders';
import HeaderFilterCard from './headerFilterCard/HeaderFilterCard';
// import AutoPlayMethods from '../../components/slider/resCategoryProduct/resCategory';

export default function Header() {
  return (
    <header className='header'>
      <HeaderTop/>
      <Navbar/>
      <HeaderFilterCard/>
      <HeaderBottom/>
      <HeaderSliders/> 
      {/* <AutoPlayMethods/> */}
    </header>
  );
}
