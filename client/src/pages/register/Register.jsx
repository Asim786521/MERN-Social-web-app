import React,{useState} from 'react'
import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import   {Link}  from 'react-router-dom'
const Register = () => {
	const [data, setData] = useState({
	 username: "",
	 
		email: "",
		password: "",
	});

    const [error, setError] = useState("");
	const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:4000/user";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};


  return (
    <div className="register-body"> 
        <div className="container-register">
    <div className="card">
      <div className="card_title">
        <h1>Create Account</h1>
        <span>Already have an account? <Link to="/login">Sign In</Link></span>
      </div>
      <div className="form">
      <form action="/register" method="post" onSubmit={handleSubmit}>
        <input type="text" name="username" value={data.name} 	required   onChange={handleChange} placeholder="UserName" />
        <input type="email" name="email" value={data.email}  	required  placeholder="Email" onChange={handleChange}   />
        <input type="password" name="password"  value={data.password} 	required  onChange={handleChange} placeholder="Password" id="password" />
        <button>Sign Up</button>
        </form>
      </div>
      <div className="card_terms">
          <input type="checkbox" name="" id="terms"/> <span>I have read and agree to the <a href="/" >Terms of Service</a></span>
      </div>
      {error && <div >{error}</div>}
    </div>
  </div></div>
  )
}

export default Register