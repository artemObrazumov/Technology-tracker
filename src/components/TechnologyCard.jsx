import "./TechnologyCard.css";
import { Link } from "react-router-dom";
import TechnologyNotes from "./TechnologyNotes.jsx";

const TechnologyCard = ({
  id,
  title,
  description,
  status,
  deadline,
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

  const formatDeadline = (deadlineString) => {
    if (!deadlineString) return null;

    const date = new Date(deadlineString);
    if (isNaN(date.getTime())) return null;

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const formattedDeadline = formatDeadline(deadline);

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
        {formattedDeadline && (
          <div className="deadline-date">Дедлайн: {formattedDeadline}</div>
        )}
      </div>

      <p className="technology-card__description">{description}</p>

      <TechnologyNotes notes={notes} onNotesChange={handleNotesChange} />

      <div className="technology-card__footer">
        <span
          className={`technology-card__status technology-card__status--${status}`}
        >
          {getStatusText()}
        </span>
        <span className="technology-card__hint">
          * Нажмите для изменения статуса
        </span>
        <Link to={`/technology/${id}`} className="btn-link">
          Подробнее →
        </Link>
      </div>
    </div>
  );
};

export default TechnologyCard;
