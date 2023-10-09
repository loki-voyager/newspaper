import db from "@/server/db";
import axios from "axios";

export const auth = async (data: string, password: string) => {
  const res = await axios.post(`http://localhost:3000/api/users`, {
    data,
    password,
  });
  return res;
};

export const getUserByUsername = async (username: string) => {
  const res = await axios.post(`http://localhost:3000/api/get_user`, {
    username,
  });
  return res;
};

export const check_users = async (data: string, password: string) => {
  const res = await axios.post(`http://localhost:3000/api/check_user`, {
    data,
    password,
  });
  return res;
};

export const new_users = async (
  username: string,
  password: string,
  first_name: string,
  last_name: string,
  email: string
) => {
  const res = await axios.post(`http://localhost:3000/api/new_user`, {
    username,
    password,
    first_name,
    last_name,
    email,
  });
  return res;
};

export const delete_user = async (username: string) => {
  const res = await axios.delete(`http://localhost:3000/api/users`, {
    data: { username },
  });
  return res;
};

export const update_user = async (
  old_username: string,
  old_password: string,
  username: string,
  password: string,
  first_name: string,
  last_name: string,
  email: string
) => {
  const res = await axios.post(`http://localhost:3000/api/update_user`, {
    old_username,
    old_password,
    username,
    password,
    first_name,
    last_name,
    email,
  });
  return res;
};
