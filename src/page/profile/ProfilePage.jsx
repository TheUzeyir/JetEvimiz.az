import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProfilePageExpired from "./ProfilePageExpired";
import ProfilePageUnpublished from "./ProfilePageUnpublished";
import ProfilePageWaiting from "./ProfilePageWaiting";
import ProfilePageCurrently from "./ProfilePageCurrently";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import style from "./profileCard.module.css";
import { useTranslation } from "react-i18next";
import Navbar from "../../layout/Header/DesktopNavbar/Navbar";
import HeaderTop from "../../layout/Header/HeaderTop/HeaderTop";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [waitingCount, setWaitingCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const [activeSection, setActiveSection] = useState("ProfilePageCurrently");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1])); 
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          Swal.fire({
            icon: "warning",
            title: t("sessionExpiredTitle"),
            text: t("sessionExpiredMessage"),
            confirmButtonText: t("ok"),
          }).then(() => {
            localStorage.removeItem("authToken"); 
            navigate("/login"); 
          });
        }
      } catch (error) {
        console.error("Token decode error:", error);
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, t]);

  const renderSection = () => {
    switch (activeSection) {
      case "ProfilePageCurrently":
        return (
          <ProfilePageCurrently
            onProductCountUpdate={(count) => setCurrentCount(count)}
          />
        );
      case "waiting":
        return (
          <ProfilePageWaiting
            onProductCountUpdate={(count) => setWaitingCount(count)}
          />
        );
      case "expired":
        return <ProfilePageExpired />;
      case "unpublished":
        return <ProfilePageUnpublished />;
      default:
        return <ProfilePageCurrently />;
    }
  };

  return (
    <div>
      <HeaderTop />
      <Navbar />
      <div className={style.aboutPage_head_container}>
        <div className="container">
          <div className={style.profileHeader}>
            <p className={style.profileHeader_left}>
              {t("profileCardPersonalaccount")}
            </p>
            <div className={style.profileHeader_right}>
              <div className={style.profileHeader_right_title}>
                <p className={style.profileHeader_right_title_headText}>
                  {t("profileCardPersonalCalculation")}
                </p>
                <p className={style.profileHeader_right_title_text}>0,00 AZN</p>
              </div>
              <button className={style.profileHeader_right_btn}>
                {t("profileCardUpMoney")}
              </button>
            </div>
          </div>
          <div className={style.profileMain_head}>
            <span
              className={`${style.aboutPage_head_title} ${
                activeSection === "ProfilePageCurrently"
                  ? style.aboutPage_head_title_active
                  : ""
              }`}
              onClick={() => setActiveSection("ProfilePageCurrently")}
            >
              {t("profileCardCurrenrtText")}-{currentCount}
            </span>
            <span
              className={`${style.aboutPage_head_title} ${
                activeSection === "waiting"
                  ? style.aboutPage_head_title_active
                  : ""
              }`}
              onClick={() => setActiveSection("waiting")}
            >
              {t("profileCardWaitText")}-{waitingCount}
            </span>
          </div>
          {renderSection()}
        </div>
      </div>
      <Footer />
      <FooterResponsive />
    </div>
  );
};

export default ProfilePage;
