import "./TechnologyCard.css";
import TechnologyNotes from "./TechnologyNotes.jsx";

const TechnologyCard = ({
  id,
  title,
  description,
  status,
  onStatusChange,
  notes,
  onNotesChange,
}) => {
  const handleClick = () => {
    onStatusChange(id);
  };

  const handleNotesChange = (e) => {
    onNotesChange(id, e.target.value);
  };

  const getStatusText = () => {
    switch (status) {
      case "completed":
        return "Изучено";
      case "in-progress":
        return "В процессе";
      case "not-started":
        return "Не начато";
      default:
        return "Некорректное состояние";
    }
  };

  return (
    <div
      className={`technology-card technology-card--${status}`}
      onClick={handleClick}
    >
      <div className="technology-card__header">
        <h3 className="technology-card__title">{title}</h3>
      </div>

      <p className="technology-card__description">{description}</p>

      <TechnologyNotes
        notes={notes}
        onNotesChange={handleNotesChange}
      />

      <div className="technology-card__footer">
        <span
          className={`technology-card__status technology-card__status--${status}`}
        >
          {getStatusText()}
        </span>
        <span className="technology-card__hint">
          * Нажмите для изменения статуса
        </span>
      </div>
    </div>
  );
};

export default TechnologyCard;
