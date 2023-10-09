"use client";
import { useUser } from "@/store";
import axios from "axios";
import { FormEventHandler, useEffect, useState } from "react";
import { Grades } from "./Grades";
import { Comment } from "./Comments";
import { delete_news } from "@/service/news";

type PostItem = {
  id: string;
  title: string;
  body: string;
  username: string;
  likes: string;
  dislikes: string;
};

type Props = {
  news: PostItem;
};
const OneNews = ({ news }: Props) => {
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

  const { username } = useUser();
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(news.title);
  const [body, setBody] = useState(news.body);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    try {
      const res = await axios.post(
        `http://localhost:3000/api/news/${news.id}`,
        {
          username,
          title,
          body,
        }
      );
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert(`Error while creating news`);
    }
  };

  const deleteNews = async () => {
    const deleted = await delete_news(news.id);
    if (deleted.status === 200) {
      window.location.href = "/news";
    }
  };

  return username === news.username ? (
    <>
      <div className="onenews">
        {!edit ? (
          <div className="onenews_body">
            <h1 className="news-h1">
              {news.title}
              <button
                className="button in"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                Edit
              </button>
              <div>
                <button className="button out" onClick={deleteNews}>
                  Delete
                </button>
              </div>
            </h1>
            <div>{news.body}</div>
          </div>
        ) : (
          <div className="onenews_body edit">
            <form className="form news" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
              <textarea
                typeof="text"
                name="body"
                value={body}
                onChange={(event) => {
                  setBody(event.target.value);
                }}
              />
              <button className="button in" type="submit">
                Edit news
              </button>
            </form>
          </div>
        )}
        <Grades id={news.id} />
        <Comment id={news.id} />
      </div>
    </>
  ) : (
    <>
      <div className="onenews">
        <h1>{news.title}</h1>
        <div>{news.body}</div>
        <div className="grades_block">
          <div className="grades likes">{news.likes} +</div>
          <div className="grades dislikes">{news.dislikes} -</div>
        </div>
        <Comment id={news.id} />
      </div>
    </>
  );
};

export { OneNews };
