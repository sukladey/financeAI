import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Profile() {
  const { user } =
    useAuth();

  const [name, setName] =
    useState(
      user?.name || ""
    );

  const [email, setEmail] =
    useState(
      user?.email || ""
    );

  const updateProfile =
    async (e) => {
      e.preventDefault();

      alert(
        "Profile update API can be connected here."
      );
    };

  const changePassword =
    async (e) => {
      e.preventDefault();

      alert(
        "Change password API can be connected here."
      );
    };

  return (
    <>
      <Navbar />

      <div
        style={{
          display:
            "flex"
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding:
              "20px"
          }}
        >
          <h1>
            Profile
          </h1>

          <form
            className="card"
            onSubmit={
              updateProfile
            }
          >
            <h3>
              Update Profile
            </h3>

            <input
              value={name}
              onChange={(
                e
              ) =>
                setName(
                  e.target
                    .value
                )
              }
            />

            <input
              value={email}
              onChange={(
                e
              ) =>
                setEmail(
                  e.target
                    .value
                )
              }
            />

            <button className="btn btn-primary">
              Update
            </button>
          </form>

          <form
            className="card"
            onSubmit={
              changePassword
            }
          >
            <h3>
              Change Password
            </h3>

            <input
              type="password"
              placeholder="New Password"
            />

            <button className="btn btn-primary">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;