export const postUploadImage = (req, res) => {
  const url = req.file.location;
  console.log(url);
  res.send(url);
};
