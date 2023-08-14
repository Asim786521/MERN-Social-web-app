
import './App.css';
import Navbar from './pages/Navbar/Navbar';
import Chat from './pages/chats/Chat';
import Post from   './components/posts/Post';
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
 import SavedPosts from './pages/savedPosts/SavedPosts.jsx';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Messenger from './pages/chatMessenger/Messenger';
 
function App() {
  const user = localStorage.getItem("token");
  return (
    <div className="App">
 
    
   <BrowserRouter>  
      <Routes> 
     
    
	 
      {user &&   <Route path="/"   exact element={ <Navbar />} />}
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" exact element={ <Login/>} />
      <Route path="/register" exact element={ <Register/>} />
      {/* {
    loggedIn ? (
      <Start />
    ) : (
      <Navigate replace to={"/"} */}
      <Route path="/posts" exact element={user?(<Post/>):<Navigate replace to="/login"/>} />
      <Route path="/saved" exact element={user?(<SavedPosts/>):<Navigate replace to="/login"/>} />
      <Route path="/chats" exact element={user?(<Chat/>):<Navigate replace to="/login"/>} />
      <Route path="/messages" exact element={user?(<Messenger/>):<Navigate replace to="/login"/>} />
      </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
