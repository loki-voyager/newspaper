"use client";

import { useUser } from "@/store";
import { useEffect } from "react";

const Auth = () => {
  const { Auth, setAuth, setUsername, setFirstName, setLastName, setEmail } =
    useUser();
  useEffect(() => {
    let user;
    const buff = localStorage.getItem("user");
    if (buff) {
      user = JSON.parse(buff);
    }

    if (user) {
      if (!Auth) setAuth();
      setUsername(user.username);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
    }
  }, [Auth, setAuth, setEmail, setFirstName, setLastName, setUsername]);

  const signOut = async () => {
    setAuth(), setUsername(null);
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      <div className="auth">
        <div>
          {!Auth ? (
            <div className="button-block">
              <button
                className="button in"
                onClick={() => {
                  window.location.href = "/signin";
                }}
              >
                {!Auth ? "Sign In" : "Cancel"}
              </button>
              <button
                className="button in"
                onClick={() => {
                  window.location.href = "/signup";
                }}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <button className="button out" onClick={signOut}>
              Sign Out
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export { Auth };
