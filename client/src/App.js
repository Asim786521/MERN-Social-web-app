import "./App.css";
import Navbar from "./pages/Navbar/Navbar";
import Chat from "./pages/Chats/Chat";
import Post from "./components/posts/Post";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SavedPosts from "./pages/SavedPosts/SavedPosts.jsx";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Messenger from "./pages/ChatMessenger/Messenger";
import { jwtDecode } from "jwt-decode";
import PrivateRoute from "./components/privateRoute/privateRoute.js";
import Artist from "./pages/Artists/Artist.jsx";
import UserRegister from "./pages/UserRegister/UserRegister.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme.js";
import UserLogin from "./pages/UserLogin/UserLogin.jsx";
function App() {
  const [user, setUser] = useState(localStorage?.getItem("token") || "");

  useEffect(() => {
    if (user) {
      try {
        const decodedJwt = jwtDecode(user);
        if (decodedJwt.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setUser("");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [user]);
  return (
    <div className="App">
      <ChakraProvider theme={theme} resetCss={false} position="relative">
      <BrowserRouter>
        <Routes>
          {user && <Route path="/" exact element={<Navbar />} />}
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" exact element={<UserLogin />} />
          <Route path="/register" exact element={<UserRegister />} />

          <Route
            path="/posts"
            exact
            element={<PrivateRoute user={user} element={<Post />} />}
          />
          <Route
            path="/saved"
            exact
            element={<PrivateRoute user={user} element={<SavedPosts />} />}
          />
          <Route
            path="/chats"
            exact
            element={<PrivateRoute user={user} element={<Messenger />} />}
          />
          <Route
            path="/messages"
            exact
            element={<PrivateRoute user={user} element={<Messenger />} />}
          />
           <Route
            path="/artists"
            exact
            element={<PrivateRoute user={user} element={<Artist />} />}
          />
   
        </Routes>
      </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
