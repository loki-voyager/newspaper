import { useState } from "react";
import { Com_grades } from "./Com_grades";
import { del_com } from "@/service/comments";
import { useUser } from "@/store";

type Comment = {
  id: number;
  news_id: number;
  parent_id: number;
  username: string;
  body: string;
  generation: string;
  likes: number;
  dislikes: number;
};

type Props = {
  com: Comment;
  username: string;
};

const Com_map = ({ com, username }: Props) => {
  const { username: user } = useUser();

  const deleteCom = async () => {
    console.log(com.id);
    const deleted = await del_com(com.id);
    if (deleted.status === 200) {
      window.location.reload();
    }
  };

  const check = user == username;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="com_username">
        {com.username} {com.generation}
      </div>
      <div className="com_body">{com.body}</div>
      <div className="grades_block">
        <Com_grades id={com.id} username={username} />
        {check && (
          <div>
            <button className="button out" onClick={deleteCom}>
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="subcom">
        <button className="button" onClick={handleOpen}>
          {open ? "-" : "+"}
        </button>
        {open && <div>yopta</div>}
      </div>
    </>
  );
};

export { Com_map };
