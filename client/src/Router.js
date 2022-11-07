import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main, LogIn, SignUp, LogOut, Profile, EditProfile } from "./pages";
import LoginCheck from "./components/LoginCheck";
import PageHeader from "./components/organisms/PageHeader";
import { ModalEditPost } from "./components/organisms/modals";

const Router = () => {
  return (
    <BrowserRouter> {/* BrowserRouter: sync with the URL in the browser address bar.*/}
      <Routes>
        <Route path="/" element={<LoginCheck />}> {/** nested routes, Children: Pages that require login */}
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
