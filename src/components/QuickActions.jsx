import './QuickActions.css';

const QuickActions = ({ onMarkAllCompleted, onResetAll, onPickRandom }) => {
  return (
    <div className="quick-actions">
      <h3 className="quick-actions__title">Быстрые действия</h3>
      <div className="quick-actions__buttons">
        <button 
          className="quick-action-btn quick-action-btn--complete"
          onClick={onMarkAllCompleted}
        >
          Отметить все как выполненные
        </button>
        <button 
          className="quick-action-btn quick-action-btn--reset"
          onClick={onResetAll}
        >
          Сбросить все статусы
        </button>
        <button 
          className="quick-action-btn quick-action-btn--random"
          onClick={onPickRandom}
        >
          Случайный выбор
        </button>
      </div>
    </div>
  );
};

export default QuickActions;