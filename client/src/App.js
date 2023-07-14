 
import './App.css';
import Navbar from './components/Navbar';
import Chat from './pages/chats/Chat';
import Post from   './pages/posts/Post';
import { BrowserRouter, Routes, Route} from "react-router-dom";
function App() {
  return (
    <div className="App">

    
   <BrowserRouter>  
      <Routes> 
     
    
	 
      <Route path="/" exact element={ <Navbar />} />
	 
      <Route path="/posts" exact element={<Post/>} />
      <Route path="/chats" exact element={<Chat/>} />
      </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
