import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./DarkTheme.css";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import TechnologyList from "./pages/TechnologyList";
import TechnologyDetail from "./pages/TechnologyDetail";
import AddTechnology from "./pages/AddTechnology";
import Login from './pages/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';
import Articles from './pages/Articles';
import ProtectedRoute from './components/ProtectedRoute';
import useAuth from './hooks/useAuth';

function App() {
  const { isLoggedIn, user, login, logout } = useAuth();

  return (
    <Router>
      <div className="app">
        <Navigation isLoggedIn={isLoggedIn} user={user} onLogout={logout} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/technologies" element={<TechnologyList />} />
            <Route path="/technology/:techId" element={<TechnologyDetail />} />
            <Route path="/add-technology" element={<AddTechnology />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile user={user} onLogout={logout} />
                </ProtectedRoute>
              }
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/statistic" element={<Statistics />} />
            <Route path="/articles" element={<Articles />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
