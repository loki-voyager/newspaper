"use client";
import { auth, getUserByUsername } from "@/service/users";
import { useUser } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

export default function SignIn() {
  const { setAuth, setUsername, setFirstName, setLastName, setEmail } =
    useUser();
  const router = useRouter();
  const hanleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = formData.get("data");
    const password = formData.get("password");
    try {
      const res = await auth(data as string,password as string)
      if (res.status === 200) {
        const username = res.data.username;
        const user = await getUserByUsername(username)
        if (user.status === 200) {
          setAuth();
          setUsername(res.data.username);
          setFirstName(res.data.first_name);
          setLastName(res.data.last_name);
          setEmail(res.data.email);
          const userStr = JSON.stringify({
            username: username,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email,
          });
          localStorage.setItem("user", userStr);
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
      alert(
        "There was an error signing in. Please check your username/email and password."
      );
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="sign">
          <div className="block">
            <form className="form" onSubmit={hanleSubmit}>
              <input type="data" name="data" placeholder="username" required />
              <input
                type="password"
                name="password"
                placeholder="password"
                required
              />
              <button className="button" type="submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
