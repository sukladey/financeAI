import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setError("");

    const result =
      await login(
        email,
        password
      );

    if (result.success) {
      navigate(
        "/dashboard"
      );
    } else {
      setError(
        result.message ||
          "Login failed"
      );
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "80px auto"
      }}
      className="card"
    >
      <h2>FinanceAI Login</h2>

      {error && (
        <p
          style={{
            color: "red",
            marginTop: "10px"
          }}
        >
          {error}
        </p>
      )}

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />

        <button
          className="btn btn-primary"
          style={{
            width: "100%",
            marginTop: "15px"
          }}
        >
          Login
        </button>
      </form>

      <p
        style={{
          marginTop: "15px"
        }}
      >
        Don't have an account?

        <Link
          to="/register"
          style={{
            marginLeft: "5px"
          }}
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;