import React, { useEffect, useState } from "react";
import userIcon from "../../img/user.svg";
import emailIcon from "../../img/email.svg";
import passwordIcon from "../../img/password.svg";
import { validate } from "./validate";
import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import backImg from "../../img/loginImg.png";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowLeft } from "react-icons/md";
import phoneImg from "../../img/phone.png";

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // for navigation
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    IsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isTermsAccepted, setIsTermsAccepted] = useState(false); // Track checkbox state

  useEffect(() => {
    setErrors(validate(data, "signUp"));
  }, [data]);

  const changeHandler = (event) => {
    const { name, value, checked } = event.target;

    if (name === "IsAccepted") {
      setData({ ...data, [name]: checked });
    } else if (name === "phone") {
      const formattedValue = value.replace(/\D/g, "");
      setData({ ...data, [name]: formattedValue });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!Object.keys(errors).length && data.IsAccepted) {
      const apiUrl =
        "https://restartbaku-001-site3.htempurl.com/api/auth/user-register";
      const payload = {
        userName: data.name,
        userPhone: data.phone,
        userEmail: data.email,
        userPassword: data.password,
        confirmPassword: data.confirmPassword,
      };

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success("Uğurla qeydiyyat olundunuz!");
          setData({
            name: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
            IsAccepted: false,
          });
          setTouched({});
        } else if (response.status === 409) {
          toast.error(
            "Bu email artiq mövcuddur və yaxud butun melumatlari daxil edin"
          );
        } else {
          toast.warning("Yenidən cəhd edin");
        }
      } catch (error) {
        toast.error("Uğursuz əməliyyat.");
        console.error("API Error:", error);
      }
    } else {
      toast.error("Please check the fields again");
      setTouched({
        name: true,
        phone: true,
        email: true,
        password: true,
        confirmPassword: true,
        IsAccepted: true,
      });
      setIsTermsAccepted(data.IsAccepted); // Update checkbox state
    }
  };

  return (
    <div className={styles.container}>
      <p
        className={styles.navigateText}
        onClick={() => {
          navigate("/");
        }}
      >
        <MdKeyboardArrowLeft />
      </p>
      <div className={styles.formContainer}>
        <form
          className={styles.formLogin}
          onSubmit={submitHandler}
          autoComplete="off"
        >
          <h2>{t("signInRegstrationText")}</h2>
          {[
            { name: "name", placeholder: t("signInNameInput"), icon: userIcon },
            {
              name: "phone",
              placeholder: t("signInPhoneInput"),
              icon: phoneImg,
              type: "text",
            },
            {
              name: "email",
              placeholder: t("signInEmailInput"),
              icon: emailIcon,
            },
            {
              name: "password",
              placeholder: t("signInPassInput"),
              icon: passwordIcon,
              type: "password",
            },
            {
              name: "confirmPassword",
              placeholder: t("signInConfitmPassInput"),
              icon: passwordIcon,
              type: "password",
            },
          ].map((input, index) => (
            <div key={index}>
              <div
                className={
                  errors[input.name] && touched[input.name]
                    ? styles.unCompleted
                    : !errors[input.name] && touched[input.name]
                    ? styles.completed
                    : undefined
                }
              >
                <input
                  type={input.type || "text"}
                  name={input.name}
                  value={data[input.name]}
                  placeholder={input.placeholder}
                  onChange={changeHandler}
                  onFocus={focusHandler}
                  autoComplete="off"
                />
                <img src={input.icon} alt="" />
              </div>
              {errors[input.name] && touched[input.name] && (
                <span className={styles.error}>{errors[input.name]}</span>
              )}
            </div>
          ))}
            <div className={styles.terms}>
              <label htmlFor="IsAccepted">
                {t('signInRulesText')}
              </label>
              <input
                type="checkbox"
                name="IsAccepted"
                checked={data.IsAccepted}
                onChange={changeHandler}
                onFocus={focusHandler}
                className={styles.termsCheckBox}
                required
              />
            </div>
          {(!data.IsAccepted && Object.keys(errors).length > 0) && (
            <p className={styles.termsError}>
              {t('signInRulesRequiredText')}
            </p>
          )}
          <div>
            <span>
              {t("signInHaveAcc")}
              <Link to="/login">{t("signInLoginText")}</Link>
            </span>
          </div>
          <button
            type="submit"
            className={styles.loginBtn}
            disabled={!data.IsAccepted || Object.keys(errors).length > 0}
          >
            {t("signInFinishRegstration")}
          </button>
        </form>
        <ToastContainer />
      </div>
      <img src={backImg} alt="Background" className={styles.LoginSignUpBackImg} />
    </div>
  );
};

export default SignUp;
