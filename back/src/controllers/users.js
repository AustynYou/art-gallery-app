export const postUsers = (req, res) => {
  console.log("success");
  res.send("users users");
  console.log(req.body.name);
};
