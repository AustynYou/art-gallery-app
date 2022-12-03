import bcrypt from "bcrypt"; // it has asynchronous APIs
import jwt from "jsonwebtoken";

import conn from "../config/db.js";
import { secretKey } from "../config/jwt.js";

// Signup process
export const postUsers = async (req, res) => {
  const { user_name, password, name } = req.body;
  // SQL statement: Get id column from user table, only if user_name from the browser is the same as that of the DB
  const query = `
    SELECT id FROM user
    WHERE user_name = '${user_name}';
  `; // must use quotation mark when using string type

  const [rows] = await conn.query(query);

  // process of checking if user_name is a duplicate or not
  // If user_name is duplicate, signup failed
  if (rows.length > 0) {
    return res
      .status(409) // Conflict: request could not be processed because of conflict in the request
      .send({ success: false, message: "Duplicate Username." });
  }

  // If user_name is not duplicate, encrypt password
  const salt = await bcrypt.genSalt(); // created ramdom salt
  const hashedPW = await bcrypt.hash(password, salt); // Adding salt to the password to improves security

  // SQL statement: Create new user with user_name, password, salt, and name column in user table
  const query2 = `
    INSERT INTO user(user_name, password, salt, name)
    VALUES(?,?,?,?)
  `; // used SQL parameters

  // include hashedPW instead of original password
  // pass an array which has user info each corresponding to the SQL parameters as the second parameter
  await conn.query(query2, [user_name, hashedPW, salt, name]);

  res.send({ success: true });
};

// Authentication: Confirms users are who they say they are.
// Login process(3 Steps): pass tokens to users
export const postUsersToken = async (req, res) => {
  // console.log(req.headers);
  const { user_name, password } = req.body;

  // id for token, salt, password for checking password
  // SQL statement: Get id and salt column from user table, only if user_name from the browser is the same as that of the DB
  const query = `
    SELECT id, salt, password FROM user
    WHERE user_name = ?
  `;

  // meaning of calling conn.query(query, [user_name])
  // (1) pass SQL statement and user_name (2) return data from DB
  const [users] = await conn.query(query, [user_name]); // [users] = [[{ id, salt }]]

  // step1: process of checking if user_name exists in DB or not
  // If user_name does not exist in DB, login failed.
  if (users.length === 0) {
    return res
      .status(401) // Unauthorized
      .send({ success: false, message: "We cannot find a matching username." });
  }
  const user = users[0];
  const { id, salt } = user;

  // step2: process of checking if password is correct or not.

  // step2-1: Encrypt password process when users login in the same way as when users signed up, again
  const hashedPW = await bcrypt.hash(password, salt); // password from req.body(browser), salt from DB

  // step2-2: If hashedPW from the browser is incorrect with DB, login failed.
  if (user.password !== hashedPW) {
    return res
      .status(401) // Unauthorized
      .send({ success: false, message: "Password is incorrect." });
  }

  // token: User authentication method in Stateless where the client and server are separated
  // step3: process of generating token if password is correct.
  const payload = {
    userId: id,
  }; // Add user's id as the claims of token
  // Claims = the contents of tokens

  // secretKey should be reused not only within this function.
  // therefore created a jwt.js file in config folder and stored the secretKey in that file.

  const option = {
    expiresIn: "1d", // Token will expire in one day
  }; // Set an automatic expiration date for tokens
  // iat: issued at
  // exp: expiraton

  // create jwt token
  const token = jwt.sign(payload, secretKey, option);

  res.send({ success: true, token });
};

// Get user info
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

// Edit user's profile image info
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
  `; // must use quotation mark when using string type

  await conn.query(query);
  res.send({ success: true });
};

// Edit user info
export const patchUsersMyInfo = async (req, res) => {
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
  `; // must use quotation mark when using string type

  await conn.query(query);
  res.send({ success: true });
};
