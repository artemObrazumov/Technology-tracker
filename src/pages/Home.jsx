import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="page home-page">
      <div className="hero-section">
        <h1>Добро пожаловать на главную страницу!</h1>
        <p>Это стартовая страница приложения</p>
      </div>

      <div className="features">
        <h2>Наши возможности:</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Отслеживание прогресса</h3>
          </div>
          <div className="feature-card">
            <h3>Динамическая загрузка контента</h3>
          </div>
          <div className="feature-card">
            <h3>Быстрая работа без перезагрузки</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;