import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    onLogin(formData.username, formData.password);
    navigate("/profile");
  };

  const handleQuickLogin = () => {
    setFormData({
      username: "admin",
      password: "admin",
    });
  };

  return (
    <div className="page login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Вход в аккаунт</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Введите имя пользователя"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn btn-primary login-btn">
            Войти
          </button>

          <div className="demo-logins">
            <div className="demo-buttons">
              <button
                type="button"
                className="btn demo-btn admin-btn"
                onClick={() => handleQuickLogin()}
              >
                Войти как Админ
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
