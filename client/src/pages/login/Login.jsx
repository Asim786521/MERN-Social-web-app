import React ,{useState}from 'react'
import "./Login.css"
import axios from 'axios'
const Login = () => {

  const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
    
	};

	const handleSubmit = async (e) => {
		//const [dename,setDename]=useState('')
		e.preventDefault();
		try {
			const url = "http://localhost:4000/auth";
		
			const { data: res } = await axios.post(url, data);
    console.log(res.message);
    localStorage.setItem("token", res.data);
			window.location = "/";
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
    <body className='body-login'>
    <div className="container">
    <div className="form-box">
      <div className="header-form">
        <h4 className="text-primary text-center"><i className="fa fa-user-circle" style={{fontSize:"110px"}}></i></h4>
        <div className="image">
        </div>
      </div>
      <div className="body-form">
       <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
<div className="input-group-prepend">
<span className="input-group-text"><i class="fa fa-user"></i></span>
</div>
<input type="email"  	name="email"
							onChange={handleChange}
							value={data.email} className="form-control" placeholder="Username" />
</div>
<div className="input-group mb-3">
<div className="input-group-prepend">
<span className="input-group-text"><i class="fa fa-lock"></i></span>
</div>
<input type="password" 	name="password"
							onChange={handleChange}
							value={data.password} className="form-control" placeholder="Password" />
</div>
<button type="submit" className="btn btn-secondary btn-block">LOGIN</button>
<div className="message">
<div><input type="checkbox" /> Remember ME</div>
<div><a href="/#">Forgot your password</a></div>
</div>
{error && <div >{error}</div>}
</form>
        <div className="social">
          <a href="/#"><i className="fab fa-facebook"></i></a>
          <a href="/#"><i className="fab fa-twitter-square"></i></a>
          <a href="/#"><i className="fab fa-google"></i></a>
        </div>
      </div>
    </div>
   </div> </body>  
  )
}

export default Login