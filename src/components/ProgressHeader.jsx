import './ProgressHeader.css';

const ProgressHeader = ({ technologies }) => {
  const totalTechnologies = technologies.length;
  const completedTechnologies = technologies.filter(tech => tech.status === 'completed').length;
  const progressPercentage = totalTechnologies > 0 
    ? Math.round((completedTechnologies / totalTechnologies) * 100) 
    : 0;

  const getProgressColor = () => {
    if (progressPercentage >= 80) return '#0dcd8dff';
    if (progressPercentage >= 50) return '#e49917ff';
    return '#f42a2aff';
  };

  return (
    <div className="progress-header">
      <div className="progress-header__stats">
        <div className="progress-stat">
          <span className="progress-stat__value">{totalTechnologies}</span>
          <span className="progress-stat__label">Всего технологий</span>
        </div>
        <div className="progress-stat">
          <span className="progress-stat__value">{completedTechnologies}</span>
          <span className="progress-stat__label">Изучено</span>
        </div>
        <div className="progress-stat">
          <span className="progress-stat__value">{progressPercentage}%</span>
          <span className="progress-stat__label">Прогресс</span>
        </div>
      </div>
      
      <div className="progress-bar">
        <div className="progress-bar__info">
          <span>Общий прогресс</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="progress-bar__track">
          <div 
            className="progress-bar__fill"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: getProgressColor()
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;