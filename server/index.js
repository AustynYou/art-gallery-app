import app from "./src/app.js";

const port = 8000;

app.listen(port, (req, res) => {
  console.log(port + "번에서 서버 실행 중");
});
