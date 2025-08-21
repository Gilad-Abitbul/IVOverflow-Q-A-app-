import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Landing";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import useAuth from "./hooks/useAuth";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import Question from "./pages/Question";
import QuestionInfo from "./pages/QuestionInfo";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { isLoading } = useAuth();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/question"
            element={isAuthenticated ? <Question /> : <Navigate to="/login" />}
          />
          <Route path="/question/:id" element={<QuestionInfo />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
};

export default App;
