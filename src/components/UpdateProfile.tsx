"use client";
import { delete_user, update_user } from "@/service/users";
import { useUser } from "@/store";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

const UpdateProfile = () => {
  const router = useRouter();
  const {
    username,
    first_name,
    last_name,
    email,
    setAuth,
    setUsername,
    setFirstName,
    setLastName,
    setEmail,
  } = useUser();
  const old_username = username as string;
  const old_first_name = first_name as string;
  const old_last_name = last_name as string;
  const old_email = email as string;
  const deleteUser = async () => {
    const user = await delete_user(username as string);
    if (user.status === 200) {
      setAuth(), setUsername(null);
      localStorage.removeItem("user");
    }
  };

  const hanleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = (formData.get("username") as string) || old_username ;
    const old_password = formData.get("old_password") as string;
    const password = (formData.get("password") as string) || old_password;
    const first_name = (formData.get("first_name") as string) || old_first_name;
    const last_name = (formData.get("last_name") as string) || old_last_name;
    const email = (formData.get("email") as string) || old_email;
    try {
      const res = await update_user(old_username,old_password,username,password,first_name,last_name,email)
      if (res.status === 200) {
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
    } catch (error) {}
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
              <form className="form" onSubmit={hanleSubmit}>
                <input type="username" name="username" placeholder={username} />
                <input
                  type="password"
                  name="old_password"
                  placeholder="OLD password"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="NEW password"
                />
                <input
                  type="first_name"
                  name="first_name"
                  placeholder={first_name as string}
                />
                <input
                  type="last_name"
                  name="last_name"
                  placeholder={last_name as string}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={email as string}
                />
                <button className="button" type="submit">
                  Update
                </button>
              </form>
            </div>
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

export { UpdateProfile };
