import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div   style={{
        width: "200px",
        minHeight: "100vh",
        background: "white",
        color: "#254361",
        padding:"25px"
        
      }}>
      {/* <h2>FinanceAI</h2> */}

      <ul style={{
          listStyle: "none",
          marginTop: "30px"
         
        }}>
        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/income">
            Income
          </Link>
        </li>

        <li>
          <Link to="/expense">
            Expense
          </Link>
        </li>

        <li>
          <Link to="/budget">
            Budget
          </Link>
        </li>

        <li>
          <Link to="/reports">
            Reports
          </Link>
        </li>

        <li>
          <Link to="/profile">
            Profile
          </Link>
        </li>

        <li>
          <Link to="/ai">
            AI Advisor
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;