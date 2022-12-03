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
    LIMIT 30;
  `; // post.* means all of the posts in DB
  // several images have the same post_id -> using GROUP_CONCAT(), concat these images
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
  console.log(payload);

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
  // Promise.all() = Promise를 병렬로 처리한다. -> 왜 병렬로 처리를 했냐? 이유가 뭐냐?

  res.send({ success: true });
};

// Edit a post
export const putPosts = async (req, res) => {
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
  const { id, fileList, content } = req.body;

  const query = `
    UPDATE post 
    set user_id = '${userId}', content = '${content}'
    WHERE id = ${id}
  `; // must use quotation mark when using string type

  await conn.query(query);

  const promiseList = fileList.map((file) => {
    const query2 = `
      INSERT INTO image(post_id, url)
      VALUES(${id}, "${file}");
  `;
    return conn.query(query2);
  });
  await Promise.all(promiseList);

  res.send({ success: true });
};

export const deletePosts = async (req, res) => {
  const token = req.headers.authorization;

  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (e) {
    console.log(e);
    console.log(token);
    return res.status(401).send({ success: false });
  }
  console.log(req);
  console.log(req.body);
  console.log(req.body.id);

  console.log(id);
  const query = `
    DELETE FROM post
    WHERE id = ${id}
  `;
  await conn.query(query);
  res.send({ success: true });
};
