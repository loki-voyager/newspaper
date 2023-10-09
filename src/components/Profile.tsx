"use client";

import { delete_user } from "@/service/users";
import { useUser } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  useEffect(() => {}, []);
  const router = useRouter();
  const { username, first_name, last_name, email, setAuth, setUsername } =
    useUser();
  const deleteUser = async () => {
    const user = await delete_user(username as string);
    if (user.status === 200) {
      setAuth(), setUsername(null);
      localStorage.removeItem("user");
    }
  };
  return (
    username && (
      <>
        <div className="profile">
          <div>
            <h1>Profile of {username}</h1>
          </div>
          <div>
            <div className="block">
              <div>
                First name: <span>{first_name}</span>
              </div>
              <div>
                Last name: <span>{last_name}</span>
              </div>
              <div>
                Email: <span>{email}</span>
              </div>
              <div className="btn_block">
                <button
                  className="button"
                  onClick={() => {
                    router.push("/liked");
                  }}
                >
                  To_Liked_News
                </button>
                <button
                  className="button"
                  onClick={() => {
                    router.push("/disliked");
                  }}
                >
                  To_Disliked_News
                </button>
              </div>
            </div>
          </div>
          <div>
            <button
              className="button edit"
              onClick={() => {
                router.push("/updateprofile");
              }}
            >
              Edit Profile
            </button>
          </div>
          <div>
            <button className="button out" onClick={deleteUser}>
              Delete User
            </button>
          </div>
        </div>
      </>
    )
  );
};

export { Profile };
