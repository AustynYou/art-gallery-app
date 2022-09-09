import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import Router from "./Router";
import instance from "./apis";
import { loginState } from "./stores";

function App() {
  const setIsLogin = useSetRecoilState(loginState);
  const [isLoginChecked, setIsLoginChecked] = useState(false);

  useEffect(() => {
    const { token } = localStorage;
    if (token) {
      instance.defaults.headers.common["Authorization"] = token;
      setIsLogin(true);
    }
    setIsLoginChecked(true);
  }, []);

  if (!isLoginChecked) return <></>;

  return <Router />;
}

export default App;
