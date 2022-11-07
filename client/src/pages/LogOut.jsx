import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../stores";

import instance from "../apis";

const LogOut = () => {
  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();
  useEffect(() => {
    // When user logged out, the token will be removed from the header.
    delete localStorage.token;
    delete instance.defaults.headers.common["Authorization"];
    setIsLogin(false);
    navigate("/login");
  }, []);
  return null;
  // There is no need to print anything because it is on the logout page.
  // Instead, it will be navigated to the login page.
};

export default LogOut;
