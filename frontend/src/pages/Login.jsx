import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login (){
  const navigate = useNavigate();
  const {login} = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(
        formData.email,
        formData.password
    );

    if(result.success){
        navigate("/dashboard");
    } else{
        setError(result.message);
    }
  };

  return(
    <div className="auth-container">
        <h2>
            financeAI Login
        </h2>

        {error && (
            <p style = {{
            color: "red",
            marginTop: "10px",
            }} >
                {error}
            </p>

            )}

            <form onSubmit= {handleSubmit}>
                <div className="form-group">
                    <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div>
                    <input 
                    type="password" 
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                </div>

                <button className="btn btn-primary" type="submit">
                    Login
                </button>

            </form>
            <p style={{marginTop: "15px",}} >
                Don't have an account?
                <Link to ="/register" style={{marginLeft: "5px",}} >
                Register
                </Link>
            </p>
    </div>
  );
}

export default Login;
