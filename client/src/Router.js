import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Main,
  LogIn,
  SignUp,
  LogOut,
  Profile,
  EditProfile,
} from "./components/pages";
import LoginCheck from "./components/LoginCheck";
import PageHeader from "./components/organisms/PageHeader";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginCheck />}>
          <Route path="/" element={<PageHeader />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/" element={<Main />} />
          </Route>
        </Route>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<LogOut />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
