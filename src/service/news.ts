import axios from "axios";

export const get_all_news = async () => {
  const res = await axios.get("http://localhost:3000/api/news");

  const data = res.data
    .slice(0)
    .reverse()
    .map((element: any) => {
      return element;
    });

  return data;
};

export const get_one_news = async (id: string) => {
  const res = await axios.get(`http://localhost:3000/api/news/${id}`);
  return res;
};

export const edit_news = async (
  id: string,
  username: string,
  title: string,
  body: string
) => {
  const res = await axios.post(`http://localhost:3000/api/news/${id}`, {
    username,
    title,
    body,
  });
  return res;
};

export const new_news = async (
  title: string,
  body: string,
  username: string
) => {
  const res = await axios.post(`http://localhost:3000/api/news`, {
    title,
    body,
    username,
  });
  return res;
};

export const liked_list = async (username: string) => {
  const res = await axios.post(`http://localhost:3000/api/infolikelist`, {
    username,
  });
  return res;
};

export const disliked_list = async (username: string) => {
  const res = await axios.post(`http://localhost:3000/api/infodislikelist`, {
    username,
  });
  return res;
};

export const like = async (news_id: number, username: string) => {
  const res = await axios.post(`http://localhost:3000/api/likenews/`, {
    news_id,
    username,
  });
  return res;
};

export const dislike = async (news_id: number, username: string) => {
  const res = await axios.post(`http://localhost:3000/api/dislikenews/`, {
    news_id,
    username,
  });
  return res;
};

export const get_grades = async (username: string) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/grades`, {
      username,
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const new_comment = async (
  news_id: number,
  parent_id: number | null,
  username: string,
  data: string
) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/comment`, {
      news_id,
      parent_id,
      username,
      data,
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const delete_news = async (id: string) => {
  const res = await axios.delete(`http://localhost:3000/api/news/${id}`);
  return res;
};
