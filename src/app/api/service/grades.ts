import db from "@/server/db";

export const check_dislike = async (news_id: number, username: string) => {
  try {
    const user = await db.query(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    return user.rows[0].dislikes.includes(news_id);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const check_like = async (news_id: number, username: string) => {
  try {
    const user = await db.query(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    return user.rows[0].likes.includes(news_id);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const dislike_news = async (news_id: number, username: string) => {
  try {
    const news_dislikes = await db.query(`UPDATE news
    SET dislikes = dislikes + 1
    WHERE id = ${news_id};`);
    if (news_dislikes.rowCount) {
      const user_dislikes = await db.query(
        `UPDATE users SET dislikes = array_append(dislikes, ${news_id}) WHERE username = '${username}';`
      );
      if (user_dislikes.rowCount) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const like_news = async (news_id: number, username: string) => {
  try {
    const news_likes = await db.query(`UPDATE news
    SET likes = likes + 1
    WHERE id = ${news_id};`);
    if (news_likes.rowCount) {
      const user_likes = await db.query(
        `UPDATE users SET likes = array_append(likes, ${news_id}) WHERE username = '${username}';`
      );
      if (user_likes.rowCount) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const undislike_news = async (news_id: number, username: string) => {
  try {
    const news_undislikes = await db.query(
      `UPDATE news SET dislikes = dislikes - 1 WHERE id = ${news_id};`
    );
    if (news_undislikes.rowCount) {
      const user_undislikes = await db.query(
        `UPDATE users SET dislikes = array_remove(dislikes, ${news_id}) WHERE username = '${username}';`
      );
      if (user_undislikes.rowCount) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const unlike_news = async (news_id: number, username: string) => {
  try {
    const news_unlikes = await db.query(
      `UPDATE news SET likes = likes - 1 WHERE id = ${news_id};`
    );
    if (news_unlikes.rowCount) {
      const user_unlikes = await db.query(
        `UPDATE users SET likes = array_remove(likes, ${news_id}) WHERE username = '${username}';`
      );
      if (user_unlikes.rowCount) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new Error(`${error}`);
  }
};