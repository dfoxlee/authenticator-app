import { FiToggleLeft, FiToggleRight } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import { useState, useRef } from "react";
import styles from "./Home.module.css";
import "react-toastify/dist/ReactToastify.css";

export const Home = ({ authenticated, authenticateUser, addUser }) => {
   const [formOption, setFormOption] = useState("login");
   const userName = useRef();
   const password = useRef();
   const password2 = useRef();

   const handleLoginOption = () => {
      return setFormOption("login");
   };

   const handleSignUpOption = () => {
      return setFormOption("signup");
   };

   const handleToast = (message) => {
      toast(message);
   };

   const handleFormSubmit = async (e) => {
      e.preventDefault();

      if (formOption === "login") {
         const message = await authenticateUser({
            userName: userName.current,
            userPassword: password.current,
         });
         handleToast(message);
         return;
      }
      if (password !== password2) {
         handleToast("Passwords do not match.");
         return;
      }
      const message = await addUser({
         userName: userName.current,
         userPassword: password.current,
      });
      handleToast(message);
      return;
   };

   const updateUsername = (e) => {
      userName.current = e.target.value;
   };

   const updatePassword = (e) => {
      password.current = e.target.value;
   };

   const updatePassword2 = (e) => {
      password2.current = e.target.value;
   };

   return (
      <div className={styles.container}>
         <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
         <div className={styles.wrapper}>
            <h1 className={styles.authenticationTitle}>
               Please Authenticate Below
            </h1>
            <div className={styles.loginSignupBtnWrapper}>
               <button
                  className={styles.loginSignupBtn}
                  onClick={handleSignUpOption}
               >
                  Sign Up
               </button>
               {formOption === "signup" ? (
                  <FiToggleLeft className={styles.toggleIcon} />
               ) : (
                  <FiToggleRight className={styles.toggleIcon} />
               )}
               <button
                  className={styles.loginSignupBtn}
                  onClick={handleLoginOption}
               >
                  Login
               </button>
            </div>
            <form className={styles.formWrapper} onSubmit={handleFormSubmit}>
               <div className={styles.inputWrapper}>
                  <label htmlFor="username">Username:</label>
                  <input
                     className={styles.formInput}
                     type="text"
                     name="username"
                     onChange={updateUsername}
                  />
               </div>
               <div className={styles.inputWrapper}>
                  <label htmlFor="password1">Password:</label>
                  <input
                     className={styles.formInput}
                     type="password"
                     name="password1"
                     onChange={updatePassword}
                  />
               </div>
               {formOption === "signup" ? (
                  <div className={styles.inputWrapper}>
                     <label htmlFor="password2">Confirm Password:</label>
                     <input
                        className={styles.formInput}
                        type="password"
                        name="password2"
                        onChange={updatePassword2}
                     />
                  </div>
               ) : null}
               <button
                  className={styles.loginSignupFormBtn}
                  onClick={handleFormSubmit}
               >
                  {formOption === "login" ? "Login" : "Sign Up"}
               </button>
            </form>
         </div>
      </div>
   );
};
