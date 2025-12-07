import useTheme from "../hooks/useTheme";
import "./Settings.css";

const Settings = () => {
  const { toggleTheme, getCurrentTheme } = useTheme();

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1 className="settings-title">Настройки</h1>
        </div>
        <div className="current-theme-indicator">
          <span className="theme-text">
            Текущая тема: {getCurrentTheme() === "dark" ? "Темная" : "Светлая"}
          </span>
          <button className="quick-action-btn" onClick={toggleTheme}>
            Сменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
