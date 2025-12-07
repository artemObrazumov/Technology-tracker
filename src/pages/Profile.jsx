import { Link } from 'react-router-dom';
import './Profile.css';

function Profile({ user, onLogout }) {
  if (!user) {
    return (
      <div className="page">
        <h1>Пользователь не найден</h1>
        <p>Пожалуйста, войдите в систему</p>
        <Link to="/login" className="btn btn-primary">
          Войти
        </Link>
      </div>
    );
  }

  return (
    <div className="page profile-page">
      <div className="profile-header">
        
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p className="profile-username">{user.username}</p>
        </div>
        
        <div className="profile-actions">
          <button onClick={onLogout} className="btn btn-logout">
            Выйти
          </button>
        </div>
      </div>

    </div>
  );
}

export default Profile;