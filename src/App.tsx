import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  // const navigate = useNavigate();
  // sessionStorage.clear()
  let isAuthorized = sessionStorage.getItem("accessToken");
  console.log("sessionStorage", sessionStorage)

  return (
    <BrowserRouter>
      {!isAuthorized ? <Navigate to="/login" replace={true}/> : null}
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
