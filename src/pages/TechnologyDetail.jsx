import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useTechnologies from "../hooks/useTechnologies";
import "./TechnologyDetail.css";

function TechnologyDetail() {
  const { techId } = useParams();
  const { technologies, updateStatus, updateNotes } = useTechnologies();
  const [technology, setTechnology] = useState(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const tech = technologies.find((t) => t.id === parseInt(techId));
    if (tech) {
      setTechnology(tech);
      setNotes(tech.notes || "");
    }
  }, [techId, technologies]);

  const onNotesChange = (newNotes) => {
    updateNotes(parseInt(techId), newNotes);
  };

  const getStatusText = (status) => {
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

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {techId} не существует.</p>
        <Link to="/technologies" className="btn">
          ← Назад к списку
        </Link>
      </div>
    );
  }

  return (
    <div className="page technology-detail-page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
      </div>

      <div className="technology-detail">
        <div className="detail-section">
          <h1>{technology.title}</h1>
        </div>

        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>

        <div className="detail-section">
          <h3>Статус изучения</h3>
          <div className="current-status">
            Текущий статус: {getStatusText(technology.status)}
          </div>
        </div>

        <div className="detail-section">
          <h3>Заметки</h3>
          <textarea
            className="notes-textarea"
            value={notes}
            onChange={onNotesChange}
            placeholder="Записывайте сюда важные моменты..."
            rows="3"
          />
          <div className="notes-hint">
            {notes.length > 0
              ? `Заметка сохранена (${notes.length} символов)`
              : "Добавьте заметку"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetail;
