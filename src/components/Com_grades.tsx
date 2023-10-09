import { com_dislike, com_like, get_com_grades } from "@/service/comments";
import { useEffect, useState } from "react";

type Com_gradesProps = {
  id: number;
  username: string | null;
};

const Com_grades = ({ id, username }: Com_gradesProps) => {
  const [grades, setGrades] = useState<{ likes: string; dislikes: string }>();
  const [likes, setLike] = useState("");
  const [dislikes, setDislike] = useState("");

  useEffect(() => {
    get_com_grades(id).then(setGrades);
    if (grades) {
      setLike(grades.likes);
      setDislike(grades.dislikes);
    }
  }, [grades, id]);

  return (
    <>
      <div
        className={"grades likes"}
        onClick={() => {
          com_like(id, username as string);
        }}
      >
        {likes} +
      </div>
      <div
        className={"grades dislikes"}
        onClick={() => {
          com_dislike(id, username as string);
        }}
      >
        {dislikes} -
      </div>
    </>
  );
};

export { Com_grades };
