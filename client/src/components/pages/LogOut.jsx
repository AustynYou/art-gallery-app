import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../stores/index";

import instance from "../../apis";

const LogOut = () => {
  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();
  useEffect(() => {
    delete localStorage.token;
    delete instance.defaults.headers.common["Authorization"];
    setIsLogin(false);
    navigate("/login");
  }, []);
  return null;
};

export default LogOut;
