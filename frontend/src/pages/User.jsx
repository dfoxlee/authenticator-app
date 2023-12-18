import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";

export const User = ({ authenticated, logoutUser }) => {
   const navigate = useNavigate();

   useEffect(() => {
      if (!authenticated.status) {
         navigate("/");
      }
   }, [authenticated, navigate]);

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <h1 className={styles.welcomeTitle}>
               Welcome {authenticated.userName}
            </h1>
            <h2 className={styles.loginDescription}>
               The last time you logged in was {authenticated.lastLogin}
            </h2>
            <button className={styles.logoutBtn} onClick={logoutUser}>
               Logout
            </button>
         </div>
      </div>
   );
};
