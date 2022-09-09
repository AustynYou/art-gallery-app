import jwt from "jsonwebtoken";
import conn from "../config/db.js";
import { secretKey } from "../config/jwt.js";

export const getPostsMain = async (req, res) => {
  const query = `
    SELECT post.*, user.name, user.profile_image,
    GROUP_CONCAT(image.url) AS imageList
    FROM post
    JOIN user ON user.id = post.user_id
    JOIN image ON image.post_id = post.id
    GROUP BY post.id
    ORDER BY post.created_at DESC
    LIMIT 15;
  `;

  const [rows] = await conn.query(query);

  const postList = rows.map((post) => {
    const imageList = post.imageList.split(",");
    return { ...post, imageList };
  });
  res.send({ success: true, postList });
};

export const postPosts = async (req, res) => {
  // console.log(req.body);
  const token = req.headers.authorization;

  let payload;
  try {
    payload = jwt.verify(token, secretKey);
    // console.log(payload);
  } catch (e) {
    console.log(e);
    return res.status(401).send({ success: false });
  }
  const { userId } = payload;

  const { fileList, content } = req.body;

  const query = `
      INSERT INTO post(user_id, content)
      VALUES(${userId}, "${content}");
    `;
  const [newPost] = await conn.query(query);
  const postId = newPost.insertId;

  const promiseList = fileList.map((file) => {
    const query2 = `
      INSERT INTO image(post_id, url)
      VALUES(${postId}, "${file}");
    `;

    return conn.query(query2);
  });

  await Promise.all(promiseList);

  res.send({ success: true });
};

export const getUsersMyPost = async (req, res) => {
  const token = req.headers.authorization;

  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (e) {
    console.log(e);
    console.log(token);
    return res.status(401).send({ success: false });
  }
  const { userId } = payload;

  const query = `
    SELECT id, content, user_id 
    FROM post WHERE user_id = ${userId};
  `;

  const [rows] = await conn.query(query);
  const [user] = rows;

  // postList[i].user_id = user.id
  // postList[i].id =

  res.send({ user });
};
