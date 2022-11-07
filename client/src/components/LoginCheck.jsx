import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../stores/index";

const LoginCheck = () => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(loginState); // 

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  return isLogin && <Outlet />; // Outlet: used as a placeholder which can render its child routes
};

export default LoginCheck;
