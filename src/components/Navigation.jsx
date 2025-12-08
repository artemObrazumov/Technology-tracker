import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoggedIn, user, onLogout }) {
  const location = useLocation();

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <h2>Трекер технологий</h2>
      </div>

      <ul className="nav-menu">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Главная
          </Link>
        </li>
        <li>
          <Link
            to="/technologies"
            className={location.pathname === "/technologies" ? "active" : ""}
          >
            Все технологии
          </Link>
        </li>
        <li>
          <Link
            to="/add-technology"
            className={location.pathname === "/add-technology" ? "active" : ""}
          >
            Добавить технологию
          </Link>
        </li>
        <li>
          <Link
            to="/statistic"
            className={location.pathname === "/statistic" ? "active" : ""}
          >
            Статистика
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className={location.pathname === "/settings" ? "active" : ""}
          >
            Настройки
          </Link>
        </li>
        <li>
          <Link
            to="/articles"
            className={location.pathname === "/articles" ? "active" : ""}
          >
            Новости
          </Link>
        </li>
        <li className="user-menu">
          {isLoggedIn ? (
            <div className="user-info">
              <Link
                to="/profile"
                className={`profile-link ${
                  location.pathname === "/profile" ? "active" : ""
                }`}
              >
                <span className="user-name">{user.username}</span>
              </Link>
              <button onClick={onLogout} className="logout-btn">
                Выйти
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`login-link ${
                location.pathname === "/login" ? "active" : ""
              }`}
            >
              Войти
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
