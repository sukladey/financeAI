import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar(){
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout();
    navigate("/");
  };

  return(
    <nav style={{ background: "#254361", color: "white", padding: "15px 30px", display: "flex", justifyContent:"space-between",}}>
      <h2 className="p-2 bold text-3xl">financeAI</h2>
      <div>
        <span>Welcome, {" "} {user?.name}</span>
        <button style={{ marginLeft: "15px", padding:"8px 12px", border: "none", cursor: "pointer", }} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;

