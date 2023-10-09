import axios from "axios";

export const com_liked_list = async (username: string) => {
  const res = await axios.post(`http://localhost:3000/api/com_like_list`, {
    username,
  });
  return res;
};

export const com_disliked_list = async (username: string) => {
  const res = await axios.post(`http://localhost:3000/api/com_dislike_list`, {
    username,
  });
  return res;
};

export const get_com = async (id: number) => {
  const res = await axios.post(`http://localhost:3000/api/get_com`, { id });
  if (res.status === 200) {
    return res.data;
  }
  return false;
};

export const get_subcom = async (id: number) => {
  const res = await axios.post(`http://localhost:3000/api/get_subcom`, { id });
  return res;
};

export const com_like = async (com_id: number, username: string) => {
  const res = await axios.post(`http://localhost:3000/api/com_like`, {
    com_id,
    username,
  });
  return res;
};

export const com_dislike = async (com_id: number, username: string) => {
  const res = await axios.post(`http://localhost:3000/api/com_dislike`, {
    com_id,
    username,
  });
  return res;
};

export const get_com_grades = async (id: number) => {
  const res = await axios.post(`http://localhost:3000/api/com_grades`, { id });
  if (res.status === 200) {
    return res.data;
  }
  return false;
};

export const comment = async (
  news_id: number | null,
  parent_id: number | null,
  username: string,
  data: string
) => {
  const res = await axios.post(`http://localhost:3000/api/comment`, {
    news_id,
    parent_id,
    username,
    data,
  });
  return res;
};

export const del_com = async (id: number | string) => {
  const res = await axios.delete(`http://localhost:3000/api/comment`, {
    data: { id },
  });

  return res
};
