import { comment, get_com } from "@/service/comments";
import { useUser } from "@/store";
import { FormEventHandler, useEffect, useState } from "react";
import { Com_map } from "./Com_map";

type Props = {
  id: string;
};

const Comment = ({ id }: Props) => {
  const { username } = useUser();

  const getDateFormatted = (date: string) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${
      dateObj.getMonth() + 1
    }/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
  };

  const [com, setCom] = useState<any[]>();
  useEffect(() => {
    get_com(Number(id)).then((com) => {
      const comWithDateFormatted = com.map((item: { generation: any }) => ({
        ...item,
        generation: getDateFormatted(item.generation),
      }));
      setCom(comWithDateFormatted);
    });
  }, [id]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = formData.get("body") as string;
    try {
      const res = await comment(Number(id), null, username as string, data);
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert(`Error while creating comments`);
    }
  };

  return com ? (
    <>
      {username ? (
        <div className="com_block">
          <div className="com_add">
            <form className="form_com" onSubmit={handleSubmit}>
              <div className="flex">
                <textarea
                  typeof="text"
                  name="body"
                  placeholder="comments"
                  required
                />
              </div>
              <button className="button in" type="submit">
                Add comments
              </button>
            </form>
          </div>
          <div className="com_map">
            {com.map((item: any) => (
              <div className="button com" key={item.id}>
                <Com_map com={item} username={username} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="com_map">
          {com.map((item: any) => (
            <div className="button com" key={item.id}>
              <div className="com_username">
                {item.username} {item.generation}
              </div>
              <div className="com_body">{item.body}</div>
              <div className="grades_block">
                <div className={"grades likes dis"}>{item.likes} +</div>
                <div className={"grades dislikes dis"}>{item.dislikes} -</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  ) : (
    <>
      {" "}
      {username ? (
        <div className="com_block">
          <div className="com_add">
            <form className="form_com" onSubmit={handleSubmit}>
              <div className="flex">
                <textarea
                  typeof="text"
                  name="body"
                  placeholder="comments"
                  required
                />
              </div>
              <button className="button in" type="submit">
                Add comments
              </button>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export { Comment };
