import React, { useState, useEffect } from 'react';
import Footer from '../../layout/footer/Footer';
import Header from '../../layout/Header/Header';
import { FaPhoneAlt, FaHeart, FaFlag } from "react-icons/fa";
import { MdDiamond, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import style from "./detailPage.module.css";
import data from "../../data.json"; 
import FooterResponsive from '../../layout/footer_responsive/FooterResponsive';

const DetailPage = () => {
    const [openComplaintBox, setOpenComplaintBox] = useState(false);
    const [product, setProduct] = useState({});
    const [mainImage, setMainImage] = useState(null);
    const { id } = useParams();
    const productId = parseInt(id);
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            const productData = data.find(item => item.id === productId);
            if (productData) {
                setProduct(productData);
                setMainImage(productData.thumbnail); 
            }
        };
        getProduct();
    }, [productId]);

    const handleImageClick = (newImage) => {
        setMainImage(newImage);
    };

    const toggleComplaintBox = () => {
        setOpenComplaintBox(prev => !prev);
    };

    return (
        <div className={style.detailPage}> 
            <Header />
            <div className="container">
                <p className={style.detailPage_goBack} onClick={() => navigate(-1)}>
                    <MdOutlineKeyboardArrowLeft /> Go Back
                </p>
                <div className={style.detailPage_main}>
                    <div className={style.detailPage_main_head}>
                        <div className={style.detailPage_main_head_left}>
                            <div className={style.detailPage_main_head_left_mainImgBox}>
                                <img
                                    src={mainImage || product.thumbnail}
                                    alt="Product"
                                    className={style.detailPage_main_head_left_mainImgBox_img}
                                />
                            </div>
                            <div className={style.detailPage_main_head_left_slideImgBox}>
                                {product.images && product.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        className={style.detailPage_main_head_left_slideImgBox_img}
                                        onClick={() => handleImageClick(image)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={style.detailPage_main_head_right}>
                            <h4 className={style.detailPage_main_head_right_humanName}>
                                {product.title || "Unknown Seller"}
                            </h4>
                            <p className={style.detailPage_main_head_right_phone}>
                                <FaPhoneAlt className={style.detailPage_main_head_right_phone_icon} /> 
                                {product.phone || "0504002200"} 
                            </p>
                            <button className={style.detailPage_main_head_right_btn}>
                                <MdDiamond /> Elanı VIP et
                            </button>
                            <p className={style.detailPage_main_head_right_otherSale}>Satıcının bütün elanlarını gör</p>
                        </div>
                    </div> 
                    <div className={style.detailPage_main_bottom}>
                        <div className={style.detailPage_main_bottom_left}>
                            <div className={style.detailPage_main_bottom_left_box}>
                                <span>Qiymət:</span> <span>{product.price || "300"}</span>
                            </div>
                            <div className={style.detailPage_main_bottom_left_box}>
                                <span>Şəhər:</span> <span>{product.city || "Bakı"}</span>
                            </div>
                            <div className={style.detailPage_main_bottom_left_box}>
                                <span>Marka:</span> <span>{product.brand || "LAND ROVER"}</span>
                            </div>
                            <div className={style.detailPage_main_bottom_left_box}>
                                <span>Model:</span> <span>{product.model || "RANGE ROVER"}</span>
                            </div>
                            <div className={style.detailPage_main_bottom_left_box}>
                                <span>Sürətlər qutusu:</span> <span>{product.transmission || "Avtomat"}</span>
                            </div>
                            <div className={style.detailPage_main_bottom_left_box}>
                                <span>Ötürücü:</span> <span>{product.drivetrain || "Arxa"}</span>
                            </div>
                            <div className={style.detailPage_main_bottom_left_box}>
                                <span>Yanacaq növü:</span> <span>{product.fuel || "Dizel"}</span>
                            </div>
                            <div className={style.detailPage_main_bottom_left_box}>
                                <span>Mühərik:</span> <span>{product.engine || "3"}</span>
                            </div>
                            <div className={style.detailPage_main_bottom_left_box}>
                                <span>İl:</span> <span>{product.year || "2017"}</span>
                            </div>
                            <div className={style.detailPage_main_bottom_left_box}>
                                <span>Ban növü:</span> <span>{product.bodyType || "Offroader"}</span>
                            </div>
                            <div className={style.detailPage_main_bottom_left_box}>
                                <span>Rəng:</span> <span>{product.color || "Gümüşü"}</span>
                            </div>
                        </div>
                        <div className={style.detailPage_main_bottom_right}>
                            <p>Elanın nömrəsi: {product.id || "2221"}</p>
                            <p>Günlük icarəyə verilir.</p>
                            <div className={style.detailPage_main_bottom_right_card}>
                                <p className={style.detailPage_main_bottom_right_card_title}>
                                    <FaHeart className={style.detailPage_main_bottom_right_card_title_icon} /> Bəyənilənlərə əlavə et
                                </p>
                                <p className={style.detailPage_main_bottom_right_card_subtitle} onClick={toggleComplaintBox}>
                                    <FaFlag className={style.detailPage_main_bottom_right_card_subtitle_icon} /> Şikayət et
                                </p>
                                {openComplaintBox && (
                                    <div className={style.detailPage_main_bottom_right_card_complaintBox_container}>
                                        <div className={style.detailPage_main_bottom_right_card_complaintBox}>
                                            <textarea placeholder="Şikayət mətni" />
                                            <button className={style.detailPage_main_bottom_right_card_complaintBox_btn}>Göndər</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <FooterResponsive/>
        </div>
    );
};

export default DetailPage;
