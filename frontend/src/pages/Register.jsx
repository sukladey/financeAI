import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { register } =
    useAuth();

  const [name, setName] =
    useState("");

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
      await register(
        name,
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
          "Registration failed"
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
      <h2>Create Account</h2>

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
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          required
        />

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
          Register
        </button>
      </form>

      <p
        style={{
          marginTop: "15px"
        }}
      >
        Already have an account?

        <Link
          to="/"
          style={{
            marginLeft: "5px"
          }}
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;