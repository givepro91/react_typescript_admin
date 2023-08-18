import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  let isAuthorized = sessionStorage.getItem("isAuthorized");
  console.log("isAuthorized", isAuthorized)

  return (
    <BrowserRouter>
      {(isAuthorized == null || !isAuthorized) ? <Navigate to="/login" replace /> : ""}
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
