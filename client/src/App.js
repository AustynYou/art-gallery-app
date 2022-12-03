import { useState, useEffect } from "react";

import { loginState } from "./stores";
import { useSetRecoilState } from "recoil";

import Router from "./Router";
import instance from "./apis";

function App() {
  const setIsLogin = useSetRecoilState(loginState);
  const [isLoginChecked, setIsLoginChecked] = useState(false);

  useEffect(() => {
    const { token } = localStorage; // get the token from localStorage
    if (token) {
      // If the token is stored in localStorage only in the login component, although it still remains in localStorage,
      // the token will be removed from the axios instance when moving to another page.
      // → Therefore, the token must be put in the axios instance in the App component, which is the top-level component, so that all pages can be authorizated.
      instance.defaults.headers.common["Authorization"] = token;
      setIsLogin(true);
    } else {
      alert("Your token was expired. Please login again.")
    }
    setIsLoginChecked(true);
  }, []);

  if (!isLoginChecked) return <></>;

  return <Router />;
}

export default App;
