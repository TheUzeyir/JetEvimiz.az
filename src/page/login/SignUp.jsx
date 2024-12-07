import React, { useEffect, useState } from "react";
import userIcon from "../../img/user.svg";
import emailIcon from "../../img/email.svg";
import passwordIcon from "../../img/password.svg";
import { validate } from "./validate";
import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import backImg from "../../img/loginImg.png" 
import { useTranslation } from "react-i18next"  

 
const SignUp = () => {
  const {t}= useTranslation() 
  const [data, setData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    IsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "signUp"));
  }, [data, touched]);

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!Object.keys(errors).length) {
      const apiUrl = "http://restartbaku-001-site3.htempurl.com/api/auth/user-register";
      const payload = {
        userName: data.name,
        userFirstName: data.firstName,
        userLastName: data.lastName,
        userPhone: data.phone,
        userEmail: data.email,
        userPassword: data.password,
        confirmPassword: data.confirmPassword,
      };

      try {
        const response = await toast.promise(
          axios.post(apiUrl, payload),
          {
            pending: "Submitting your data...",
            success: "Registration successful!",
            error: "Registration failed!",
          }
        );

        if (response.status === 200 || response.status === 201) {
          toast.success("You signed up successfully");
        } else {
          toast.warning("Unexpected error occurred");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          toast.error("Username or email already exists. Please choose a different one.");
        } else {
          toast.error("Registration failed. Please try again later.");
        }
        console.error("Error:", error);
      }
    } else {
      toast.error("Please check the fields again");
      setTouched({
        name: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        password: true,
        confirmPassword: true,
        IsAccepted: false,
      });
    }
  };

  const sendDataToAPI = async () => {
    const apiUrl = "http://restartbaku-001-site3.htempurl.com/api/auth/user-register";
    const payload = {
      userName: data.name,
      userFirstName: data.firstName,
      userLastName: data.lastName,
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
        const responseData = await response.json();
        toast.success("Data successfully sent to the API!");
          setData({
          name: "",
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          IsAccepted: false,
        });
          setTouched({});
      } else if (response.status === 409) {
        toast.error("Username or email already exists. Please choose a different one.");
      } else {
        toast.warning("Unexpected response from the API.");
      }
    } catch (error) {
      toast.error("Failed to send data to the API.");
      console.error("API Error:", error);
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        <h2>{t('signInRegstrationText')}</h2>
        {[ 
          { name: "name", placeholder:t('signInNameInput'), icon: userIcon },
          { name: "firstName", placeholder:t('signInFirstNameInput'), icon: userIcon },
          { name: "lastName", placeholder:t('signInLastNameInput'), icon: userIcon },
          { name: "phone", placeholder:t('signInPhoneInput'), icon: userIcon },
          { name: "email", placeholder:t('signInEmailInput'), icon: emailIcon },
          { name: "password", placeholder: t('signInPassInput'), icon: passwordIcon },
          { name: "confirmPassword", placeholder: t('signInConfitmPassInput'), icon: passwordIcon },
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
                type={input.name.includes("password") ? "password" : "text"}
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
        <div>
          <div className={styles.terms}>
            <input
              type="checkbox"
              name="IsAccepted"
              checked={data.IsAccepted}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            <label htmlFor="IsAccepted">{t('signInRulesText')}</label>
          </div>
          {errors.IsAccepted && touched.IsAccepted && (
            <span className={styles.error}>{errors.IsAccepted}</span>
          )}
        </div>
        <div>
          <span type="submit">{t('signInCreateAcc')}</span>
          <span>{t('signInHaveAcc')}<Link to="/login">{t('signInLoginText')}</Link></span>
        </div>
      </form>
        <button className={styles.loginBtn} onClick={sendDataToAPI} >
          {t('signInFinishRegstration')}
        </button>
      <ToastContainer />
      </div>
      <img src={backImg} alt={backImg} className={styles.LoginSignUpBackImg}/>
    </div>
  );
};

export default SignUp;