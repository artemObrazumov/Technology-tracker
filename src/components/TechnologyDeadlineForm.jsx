import { useState, useEffect } from "react";
import "./TechnologyDeadlineForm.css";

function TechnologyDeadlineForm({ technologies, onDeadlinesUpdate }) {
  const [deadlines, setDeadlines] = useState([]);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const initialDeadlines = technologies.map((tech) => ({
      id: tech.id,
      title: tech.title,
      deadline: "",
      status: tech.status,
    }));
    setDeadlines(initialDeadlines);
  }, [technologies]);

  const validateForm = () => {
    const newErrors = {};

    deadlines.forEach((item, index) => {
      if (item.deadline) {
        const deadlineDate = new Date(item.deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (deadlineDate < today) {
          newErrors[`deadline_${item.id}`] = "Дедлайн не может быть в прошлом";
        }

        const year = deadlineDate.getFullYear();
        if (year < 2000 || year > 2100) {
          newErrors[`deadline_${item.id}`] =
            "Дедлайн должен быть между 2000 и 2100 годами";
        }
      }
    });

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [deadlines]);

  const handleDeadlineChange = (id, value) => {
    setDeadlines((prev) =>
      prev.map((item) => (item.id === id ? { ...item, deadline: value } : item))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    const cleanedDeadlines = deadlines.filter(
      (item) => item.deadline.trim() !== ""
    );
    onDeadlinesUpdate(cleanedDeadlines);
    setSubmitSuccess(true);
  };

  return (
    <div className="deadline-form-container">
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {submitSuccess && "Дедлайны успешно обновлены!"}
      </div>

      {submitSuccess && (
        <div className="success-message" role="alert">
          Дедлайны успешно обновлены!
        </div>
      )}

      <div className="form-header">
        <h2>Установка сроков изучения</h2>
      </div>

      <form onSubmit={handleSubmit} className="deadline-form" noValidate>
        <div
          className="deadlines-list"
          role="group"
          aria-label="Список технологий для установки дедлайнов"
        >
          {deadlines.map((item) => (
            <div key={item.id} className="deadline-item">
              <div className="item-header">
                <div className="item-title">{item.title}</div>
              </div>

              <div className="deadline-input-group">
                <label htmlFor={`deadline-${item.id}`} className="input-label">
                  Дедлайн
                  {item.status !== "completed" && (
                    <span
                      aria-label="обязательное поле"
                      className="required-mark"
                    >
                      *
                    </span>
                  )}
                </label>
                <input
                  id={`deadline-${item.id}`}
                  type="date"
                  value={item.deadline}
                  onChange={(e) =>
                    handleDeadlineChange(item.id, e.target.value)
                  }
                  aria-required={item.status !== "completed"}
                  aria-invalid={!!errors[`deadline_${item.id}`]}
                  aria-describedby={
                    errors[`deadline_${item.id}`]
                      ? `deadline-error-${item.id}`
                      : undefined
                  }
                  className={`deadline-input ${
                    errors[`deadline_${item.id}`] ? "error" : ""
                  }`}
                  min="2000-01-01"
                  max="2100-12-31"
                />
                {errors[`deadline_${item.id}`] && (
                  <span
                    id={`deadline-error-${item.id}`}
                    className="error-message"
                    role="alert"
                  >
                    {errors[`deadline_${item.id}`]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
          >
            Сохранить дедлайны
          </button>
        </div>
      </form>
    </div>
  );
}

export default TechnologyDeadlineForm;
