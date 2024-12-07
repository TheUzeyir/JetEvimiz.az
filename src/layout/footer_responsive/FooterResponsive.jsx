import Reac,{useState,useEffect} from 'react'
import { FaHome } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaCirclePlus } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import style from "./footerResponsive.module.css"
import { useNavigate } from 'react-router-dom';
import CategoryBox from '../../components/categoryBox/CategoryBox';
import { useTranslation } from "react-i18next"

 
const FooterResponsive = () => {
    const navigate=useNavigate()
  const {t}= useTranslation()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCategories, setShowCategories] = useState(false);

    const handleCategoryClick = () => {
        setShowCategories(prev => !prev); 
    };

    useEffect(()=>{
        const savedUserName =localStorage.getItem("userName")
        if (savedUserName) {
            setUser(savedUserName);
        }
        setLoading(false);
      }, []);   

    const handleLoginClick = () => {
        if (user) {
             {
           navigate('/profil')
          }
        } else {
          navigate("/login");
        }
      };
      
  return (
    <div className={style.FooterResponsive_container}>
        <div className="container">
            <div className={style.FooterResponsive}>
                <div className={style.FooterResponsive_card_addProduct} onClick={()=>navigate('/yeniElan')}><FaCirclePlus/></div>
                <div className={style.FooterResponsive_box}>
                    <div className={style.FooterResponsive_card} onClick={()=>navigate('/')}><FaHome/><span  className={style.FooterResponsive_card_text}>{t('footerResNavMain')}</span></div>
                    <div className={style.FooterResponsive_card} onClick={()=>navigate('/CategoryBox')}><BiSolidCategory/><span className={style.FooterResponsive_card_text}>{t('footerResNavCategory')}</span></div>
                    <div className={style.FooterResponsive_card} onClick={()=>navigate('/likedPage')}><FaHeart/><span className={style.FooterResponsive_card_text}>{t('footerResNavLiked')}</span></div>
                    <div className={style.FooterResponsive_card} onClick={handleLoginClick}><IoMdPerson/><span className={style.FooterResponsive_card_text}>
                        {
                            loading
                            ? "Yukleniyor..."
                            : user
                            ? `${user}`
                            :"Giriş"
                        }
                        </span></div>
                </div>
            </div>
        </div>
        {showCategories && <CategoryBox />}
    </div>
  )
}

export default FooterResponsive
