import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import conn from "../config/db.js";
import { secretKey } from "../config/jwt.js";

export const postUsers = async (req, res) => {
  const { user_name, password, name } = req.body;
  const query = `
    SELECT id FROM user
    WHERE user_name = '${user_name}';
  `;
  const [rows] = await conn.query(query);
  if (rows.length > 0) {
    return res
      .status(409)
      .send({ success: false, message: "Duplicate Username." });
  }

  const salt = await bcrypt.genSalt();
  const hashedPW = await bcrypt.hash(password, salt);

  const query2 = `
    INSERT INTO user(user_name, password, salt, name)
    VALUES(?,?,?,?)
  `;
  await conn.query(query2, [user_name, hashedPW, salt, name]);

  res.send({ success: true });
};

export const postUsersToken = async (req, res) => {
  // console.log(req.headers);
  const { user_name, password } = req.body;
  const query = `
    SELECT id, salt, password FROM user
    WHERE user_name = ?
  `;
  const [users] = await conn.query(query, [user_name]);
  if (users.length === 0) {
    return res
      .status(401)
      .send({ success: false, message: "We cannot find a matching username." });
  }
  const user = users[0];
  const { id, salt } = user;
  const hashedPW = await bcrypt.hash(password, salt);

  if (user.password !== hashedPW) {
    return res
      .status(401)
      .send({ success: false, message: "Password is incorrect." });
  }

  const payload = {
    userId: id,
  };

  const option = {
    expiresIn: "1d",
  };

  const token = jwt.sign(payload, secretKey, option);

  res.send({ success: true, token });
};

export const getUsersMyInfo = async (req, res) => {
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
    SELECT id, memo, name, profile_image, user_name 
    FROM user WHERE id = ${userId};
  `;

  const [rows] = await conn.query(query);
  const [user] = rows;

  res.send({ user });
};

export const patchUsersMyProfileImage = async (req, res) => {
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

  const { profile_image } = req.body;

  const query = `
    UPDATE user set profile_image = '${profile_image}'
    WHERE id = ${userId}
  `;

  await conn.query(query);
  res.send({ success: true });
};

export const putUsersMyInfo = async (req, res) => {
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
  const { name, user_name, memo } = req.body;

  const query = `
    UPDATE user 
    set name = '${name}', user_name = '${user_name}', memo = '${memo}'
    WHERE id = ${userId}
  `;

  await conn.query(query);
  res.send({ success: true });
};
