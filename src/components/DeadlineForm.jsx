import { useState, useEffect, useRef } from 'react';
import './DeadlineForm.css';

function DeadlineForm({ technologies = [], onSave, onCancel }) {
  // Состояние формы
  const [formData, setFormData] = useState({
    technologyId: '',
    deadline: '',
    stageDescription: '',
    priority: 'medium'
  });

  // Состояние ошибок
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Для фокуса на первом поле
  const firstInputRef = useRef(null);

  // Валидация формы
  const validateForm = () => {
    const newErrors = {};

    // Валидация выбора технологии
    if (!formData.technologyId.trim()) {
      newErrors.technologyId = 'Выберите технологию для изучения';
    }

    // Валидация дедлайна
    if (!formData.deadline) {
      newErrors.deadline = 'Укажите срок изучения';
    } else {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (deadlineDate < today) {
        newErrors.deadline = 'Срок не может быть в прошлом';
      }
      
      // Проверка слишком далекого дедлайна (максимум 2 года)
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 2);
      if (deadlineDate > maxDate) {
        newErrors.deadline = 'Срок не может быть больше 2 лет';
      }
    }

    // Валидация описания этапа
    if (!formData.stageDescription.trim()) {
      newErrors.stageDescription = 'Опишите этап изучения';
    } else if (formData.stageDescription.trim().length < 10) {
      newErrors.stageDescription = 'Описание должно содержать минимум 10 символов';
    } else if (formData.stageDescription.trim().length > 500) {
      newErrors.stageDescription = 'Описание не должно превышать 500 символов';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  // Запуск валидации при изменении данных
  useEffect(() => {
    validateForm();
  }, [formData]);

  // Фокусировка на первом поле при монтировании
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  // Обработчик изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isFormValid) {
      // Находим выбранную технологию
      const selectedTech = technologies.find(tech => tech.id === formData.technologyId);
      
      const dataToSave = {
        ...formData,
        technologyName: selectedTech ? selectedTech.title : '',
        createdAt: new Date().toISOString()
      };
      
      onSave(dataToSave);
    }
  };

  // Обработчик нажатия клавиш
  const handleKeyDown = (e) => {
    // ESC для отмены
    if (e.key === 'Escape' && onCancel) {
      onCancel();
    }
    
    // Ctrl + Enter для отправки
    if (e.ctrlKey && e.key === 'Enter' && isFormValid) {
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="deadline-form"
      noValidate
      onKeyDown={handleKeyDown}
      aria-labelledby="deadline-form-title"
    >
      <h2 id="deadline-form-title">Установка сроков изучения технологии</h2>
      
      {/* Область для скринридера */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {isFormValid ? 'Форма валидна, можно отправлять' : 'В форме есть ошибки'}
      </div>

      {/* Поле выбора технологии */}
      <div className="form-group">
        <label htmlFor="technologyId" className="required">
          Технология для изучения
        </label>
        <select
          id="technologyId"
          name="technologyId"
          value={formData.technologyId}
          onChange={handleChange}
          ref={firstInputRef}
          className={errors.technologyId ? 'error' : ''}
          aria-required="true"
          aria-invalid={!!errors.technologyId}
          aria-describedby={errors.technologyId ? 'technologyId-error' : undefined}
          required
        >
          <option value="">-- Выберите технологию --</option>
          {technologies.map(tech => (
            <option key={tech.id} value={tech.id}>
              {tech.title} ({tech.category})
            </option>
          ))}
        </select>
        {errors.technologyId && (
          <span 
            id="technologyId-error" 
            className="error-message" 
            role="alert"
            aria-live="assertive"
          >
            {errors.technologyId}
          </span>
        )}
      </div>

      {/* Поле срока */}
      <div className="form-group">
        <label htmlFor="deadline" className="required">
          Срок изучения
        </label>
        <input
          id="deadline"
          name="deadline"
          type="date"
          value={formData.deadline}
          onChange={handleChange}
          className={errors.deadline ? 'error' : ''}
          aria-required="true"
          aria-invalid={!!errors.deadline}
          aria-describedby={errors.deadline ? 'deadline-error' : undefined}
          min={new Date().toISOString().split('T')[0]}
          max={new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0]}
          required
        />
        <div className="hint">Минимальная дата: сегодня, максимальная: +2 года</div>
        {errors.deadline && (
          <span 
            id="deadline-error" 
            className="error-message" 
            role="alert"
            aria-live="assertive"
          >
            {errors.deadline}
          </span>
        )}
      </div>

      {/* Поле приоритета */}
      <div className="form-group">
        <label htmlFor="priority">
          Приоритет изучения
        </label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          aria-describedby="priority-help"
        >
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
          <option value="critical">Критический</option>
        </select>
        <div id="priority-help" className="hint">
          Высокий приоритет будет выделен в списке
        </div>
      </div>

      {/* Поле описания этапа */}
      <div className="form-group">
        <label htmlFor="stageDescription" className="required">
          Описание этапа изучения
        </label>
        <textarea
          id="stageDescription"
          name="stageDescription"
          value={formData.stageDescription}
          onChange={handleChange}
          rows="4"
          className={errors.stageDescription ? 'error' : ''}
          aria-required="true"
          aria-invalid={!!errors.stageDescription}
          aria-describedby={errors.stageDescription ? 'stageDescription-error' : 'stageDescription-help'}
          placeholder="Опишите, что именно нужно изучить, какие темы охватить, какие проекты сделать..."
          required
        />
        <div id="stageDescription-help" className="hint">
          Минимум 10 символов, максимум 500
        </div>
        {errors.stageDescription && (
          <span 
            id="stageDescription-error" 
            className="error-message" 
            role="alert"
            aria-live="assertive"
          >
            {errors.stageDescription}
          </span>
        )}
      </div>

      {/* Группа кнопок */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn-primary"
          disabled={!isFormValid}
          aria-disabled={!isFormValid}
        >
          Сохранить срок
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Отмена
          </button>
        )}
        <div className="keyboard-hints">
          <span className="hint">Подсказки: </span>
          <kbd>Esc</kbd> - отмена, 
          <kbd>Ctrl</kbd> + <kbd>Enter</kbd> - отправить
        </div>
      </div>
    </form>
  );
}

export default DeadlineForm;