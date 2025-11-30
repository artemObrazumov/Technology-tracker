import './ProgressBar.css';

function ProgressBar({ progress }) {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
          <span className="progress-percentage">{normalizedProgress}%</span>
        </div>

      <div
        className="progress-bar-outer"
        style={{
          height: `20px`,
          backgroundColor: '#f0f0f0',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
      >
        <div
          className={`progress-bar-inner animated`}
          style={{
            width: `${normalizedProgress}%`,
            backgroundColor: '#4CAF50',
            height: '100%',
            transition: 'width 0.5s ease-in-out',
            borderRadius: '10px'
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;