import { useState } from 'react';
import Modal from './Modal';
import './QuickActions.css';

function QuickActions({ onMarkAllCompleted, onResetAll, onPickRandom, technologies }) {
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies: technologies
    };
    const dataStr = JSON.stringify(data, null, 2);
    console.log('Данные для экспорта: ', dataStr);
    
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tech-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowExportModal(true);
  };

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
        <button 
          className="quick-action-btn quick-action-btn--export"
          onClick={handleExport}
        >
          Экспорт
        </button>
      </div>

      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <div className="export-modal-content">
          <p>Данные успешно экспортированы! Файл был скачан автоматически.</p>
          <button 
            onClick={() => setShowExportModal(false)}
            className="quick-action-btn quick-action-btn--success"
          >
            Закрыть
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default QuickActions;