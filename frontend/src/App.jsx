import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Home } from "./pages/Home";
import { User } from "./pages/User";

function App() {
   const [authenticated, setAuthenticated] = useState({
      status: false,
      userName: "",
      lastLogin: "",
   });
   
   const navigate = useNavigate();

   const addUser = async ({ userName, userPassword }) => {
      const res = await axios({
         method: "post",
         headers: {
            "Access-Control-Allow-Origin": "*",
         },
         url: "http://localhost:3000/api/v1/users/addUser",
         data: {
            userName: userName,
            userPassword: userPassword,
         },
      });

      if(res.data.error) {
         return res.data.message
      }

      setAuthenticated({
         status: true,
         userName: res.data.userName,
         lastLogin: res.data.lastLogin,
      });

      navigate("/user")
   };

   const authenticateUser = async ({ userName, userPassword }) => {
      const res = await axios({
         method: "post",
         headers: {
            "Access-Control-Allow-Origin": "*",
         },
         url: "http://localhost:3000/api/v1/users/authenticateUser",
         data: {
            userName: userName,
            userPassword: userPassword,
         },
      });

      if(res.data.error) {
         return res.data.message
      }

      setAuthenticated({
         status: true,
         userName: res.data.userName,
         lastLogin: res.data.lastLogin,
      });
      navigate('/user');
   };

   const logoutUser = () => {
    return setAuthenticated({
      status: false,
      userName: '',
      lastLogin: ''
    })
   }

   return (
      <Routes>
         <Route
            path="/"
            element={
               <Home
                  authenticated={authenticated}
                  authenticateUser={authenticateUser}
                  addUser={addUser}
               />
            }
         />
         <Route
            path="/user"
            element={
               authenticated.status ? (
                  <User authenticated={authenticated} logoutUser={logoutUser} />
               ) : (
                  <Navigate to="/" />
               )
            }
         />
      </Routes>
   );
}

export default App;
