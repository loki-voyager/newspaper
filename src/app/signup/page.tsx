"use client";
import { getUserByUsername, new_users } from "@/service/users";
import { useUser } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

export default function SignUn() {
  const {
    setAuth,
    setUsername,
    setFirstName,
    setLastName,
    setEmail,
    username,
    first_name,
    last_name,
    email,
  } = useUser();
  const router = useRouter();
  const hanleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    try {
      const res = await new_users(
        username,
        password,
        first_name,
        last_name,
        email
      );
      if (res.status === 200) {
        const user = await getUserByUsername(username);
        if (user.status === 200) {
          const userStr = JSON.stringify({
            username: username,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email,
          });

          localStorage.setItem("user", userStr);
          setAuth();
          setUsername(username);
          setFirstName(first_name);
          setLastName(last_name);
          setEmail(email);
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
      alert("User with this data(username/email) already exist");
    }
  };
  return (
    <>
      <div className="wrapper">
        <div className="sign">
          <div className="block">
            <form className="form" onSubmit={hanleSubmit}>
              <input
                type="username"
                name="username"
                placeholder="username"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                required
              />
              <input
                type="first_name"
                name="first_name"
                placeholder="first name"
                required
              />
              <input
                type="last_name"
                name="last_name"
                placeholder="last name"
                required
              />
              <input type="email" name="email" placeholder="email" required />
              <button className="button" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
