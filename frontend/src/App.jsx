import { Route, Routes } from "react-router-dom";

// pages :
import SignUp from "./pages/signUp";
import LogIn from "./pages/logIn";
import IndexPage from "./pages/indexPage";

// dashboard
import Dashboard from "./pages/dashboard";
// users
import Users from "./components/dashboard/users/users";
import EditUser from "./components/dashboard/users/EditUser";
import CreateUser from "./components/dashboard/users/createUser";
import RequireAuth from "./auth/requireAuth";
import RefreshAuth from "./auth/refreshAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route element={<RefreshAuth></RefreshAuth>}>
        <Route path="/" element={<IndexPage />}></Route>
          <Route element={<RequireAuth></RequireAuth>}>
            <Route path='/dashboard' element={<Dashboard/>}>
              <Route path='users'  element={<Users/>}>
                <Route path=':id' element={<EditUser/>}/>
                <Route path='create' element={<CreateUser/>}/>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
