import './ProgressHeader.css';

const ProgressHeader = ({ technologies }) => {
  const totalTechnologies = technologies.length;
  const completedTechnologies = technologies.filter(tech => tech.status === 'completed').length;
  const inProgressTechnologies = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStartedTechnologies = technologies.filter(tech => tech.status === 'not-started').length;
  
  const progressPercentage = totalTechnologies > 0 
    ? Math.round((completedTechnologies / totalTechnologies) * 100) 
    : 0;

  return (
    <div className="progress-header">
      <div className="progress-header__stats">
        <div className="progress-stat progress-stat--completed">
          <span className="progress-stat__value">{completedTechnologies}</span>
          <span className="progress-stat__label">Изучено</span>
        </div>
        <div className="progress-stat progress-stat--in-progress">
          <span className="progress-stat__value">{inProgressTechnologies}</span>
          <span className="progress-stat__label">В процессе</span>
        </div>
        <div className="progress-stat progress-stat--not-started">
          <span className="progress-stat__value">{notStartedTechnologies}</span>
          <span className="progress-stat__label">Не начато</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;