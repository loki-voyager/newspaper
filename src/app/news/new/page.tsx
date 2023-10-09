"use client";
import { new_news } from "@/service/news";
import { useUser } from "@/store";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

export default function SignIn() {
  const router = useRouter();
  const { username } = useUser();
  if (!username) window.location.href = "/";
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    try {
      const res = await new_news(title,body,username as string)
      if (res.status === 200) {
        router.push("/news");
      }
    } catch (error) {
    }
  };

  return (
    <>
      <div className="wrapper">
        <form className="form news" onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="title" />
          <textarea typeof="text" name="body" placeholder="body" />
          <button className="button in" type="submit">
            Add news
          </button>
        </form>
      </div>
    </>
  );
}
