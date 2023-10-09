import { useEffect, useState } from "react";
import { dislike, get_grades, get_one_news, like } from "@/service/news";
import { useUser } from "@/store";

type Props = {
  id: string;
};

const Grades = ({ id }: Props) => {
  const { username } = useUser();
  if (!username) window.location.href = "/";

  const [news, setNews] = useState<{
    id: number;
    title: string;
    body: string;
    username: string;
    likes: string;
    dislikes: string;
  }>();
  const [likes, setLike] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [dislikes, setDislike] = useState("");
  const [grades, setGrades] = useState<{
    likes: number[];
    dislikes: number[];
  }>();

  useEffect(() => {
    get_one_news(id).then(setNews);
    // get_grades(username as string).then(setGrades);
    if (news) {
      setLike(news.likes);
      setDislike(news.dislikes);
      // if(grades?.likes.includes(news.id)){
      //   setLiked(true);
      //   setDisliked(false)
      // }
      // if(grades?.dislikes.includes(news.id)){
      //   setLiked(false);
      //   setDisliked(true)
      // }
    }
  }, [grades?.dislikes, grades?.likes, id, news, username]);
  return news ? (
    <>
      <div className="grades_block">
        <div
          className={liked ? "grades likes active" : "grades likes"}
          onClick={() => {
            like(news.id, username as string);
          }}
        >
          {likes} +
        </div>
        <div
          className={disliked ? "grades dislikes active" : "grades dislikes"}
          onClick={() => {
            dislike(news.id, username as string);
          }}
        >
          {dislikes} -
        </div>
      </div>
    </>
  ) : (
    <>
      <div>
        <h2>Loading...</h2>
      </div>
    </>
  );
};

export { Grades };
