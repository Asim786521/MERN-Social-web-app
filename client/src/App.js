
import './App.css';
import Navbar from './components/Navbar';
import Chat from './pages/chats/Chat';
import Post from   './pages/posts/Post';
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
 import SavedPosts from './pages/posts/SavedPosts';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
 
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
	 
      <Route path="/posts" exact element={<Post/>} />
      <Route path="/saved" exact element={<SavedPosts/>} />
      <Route path="/chats" exact element={<Chat/>} />
      </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
