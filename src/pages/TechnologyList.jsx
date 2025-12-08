import { useState } from "react";
import TechnologyCard from "../components/TechnologyCard";
import ProgressHeader from "../components/ProgressHeader";
import QuickActions from "../components/QuickActions";
import FilterTabs from "../components/FilterTabs";
import ProgressBar from "../components/ProgressBar";
import useTechnologies from "../hooks/useTechnologies";

function TechnologyList() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    markAllAsCompleted,
    resetAllStatuses,
    progress,
    batchUpdateStatuses,
  } = useTechnologies();

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedIds, setSelectedIds] = useState([]);
  const [batchStatus, setBatchStatus] = useState("in-progress");
  const [showBatchEditor, setShowBatchEditor] = useState(false);

  const handleBatchSubmit = async (e) => {
    e.preventDefault();
    if (selectedIds.length === 0) return;
    batchUpdateStatuses(selectedIds, batchStatus);
    setSelectedIds([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((techId) => techId !== id) : [...prev, id]
    );
  };

  const pickRandomTechnology = () => {
    const notStartedTechnologies = technologies.filter(
      (tech) => tech.status === "not-started"
    );
    if (notStartedTechnologies.length === 0) {
      return;
    }
    const randomTechnology =
      notStartedTechnologies[
        Math.floor(Math.random() * notStartedTechnologies.length)
      ];
    updateStatus(randomTechnology.id);
  };

  const filteredTechnologies = technologies.filter((tech) => {
    const matchesFilter =
      activeFilter === "all" || tech.status === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.notes.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="page technology-list-page">
      <ProgressHeader technologies={technologies} />
      <ProgressBar progress={progress} />

      <QuickActions
        onMarkAllCompleted={markAllAsCompleted}
        onResetAll={resetAllStatuses}
        onPickRandom={pickRandomTechnology}
        technologies={technologies}
      />

      <div className="batch-editor-toggle">
        <button
          type="button"
          onClick={() => setShowBatchEditor(!showBatchEditor)}
          className="btn-batch-toggle"
          aria-expanded={showBatchEditor}
        >
          {showBatchEditor ? "Скрыть" : "Массовое редактирование статусов"}
        </button>
      </div>

      {showBatchEditor && (
        <div className="batch-editor">
          <form onSubmit={handleBatchSubmit} className="batch-form">
            <div className="form-group">
              <label htmlFor="batch-status">Новый статус</label>
              <select
                id="batch-status"
                value={batchStatus}
                onChange={(e) => setBatchStatus(e.target.value)}
                aria-required="true"
                className="status-select"
              >
                <option value="not-started">Не начато</option>
                <option value="in-progress">В процессе</option>
                <option value="completed">Завершено</option>
              </select>
            </div>

            <div
              className="technologies-checkbox-list"
              role="group"
              aria-label="Список технологий для выбора"
            >
              {filteredTechnologies.map((tech) => (
                <div key={tech.id} className="checkbox-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(tech.id)}
                      onChange={() => handleCheckboxChange(tech.id)}
                      aria-label={`Выбрать технологию: ${tech.title}`}
                    />
                    <span className="tech-title">{tech.title}</span>
                    <span className={`status-badge status-${tech.status}`}>
                      {tech.status === "not-started" && "Не начато"}
                      {tech.status === "in-progress" && "В процессе"}
                      {tech.status === "completed" && "Завершено"}
                    </span>
                  </label>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={selectedIds.length === 0}
                className="btn-primary"
              >
                Применить
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск технологий по названию, описанию или заметкам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <span className="search-count">
          Найдено: {filteredTechnologies.length}
        </span>
      </div>

      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        technologies={technologies}
      />

      <div className="technologies-grid">
        {filteredTechnologies.map((technology) => (
          <TechnologyCard
            key={technology.id}
            id={technology.id}
            title={technology.title}
            description={technology.description}
            status={technology.status}
            onStatusChange={updateStatus}
            notes={technology.notes}
            onNotesChange={updateNotes}
            isSelected={selectedIds.includes(technology.id)}
            onSelectChange={() => handleCheckboxChange(technology.id)}
          />
        ))}
      </div>

      <style jsx="true">{`
        .batch-editor-toggle {
          margin: 24px 0;
          text-align: center;
        }

        .btn-batch-toggle {
          background: #6b7280;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn-batch-toggle:hover {
          background: #4b5563;
        }

        .batch-editor {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .batch-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group label {
          font-weight: 600;
          color: #374151;
          display: block;
          margin-bottom: 8px;
        }

        .status-select {
          padding: 10px 16px;
          border: 2px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          width: 100%;
          max-width: 300px;
        }

        .technologies-checkbox-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 300px;
          overflow-y: auto;
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #f9fafb;
        }

        .checkbox-item label {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: background 0.2s;
        }

        .checkbox-item label:hover {
          background: #e5e7eb;
        }

        .checkbox-item input[type="checkbox"] {
          width: 18px;
          height: 18px;
        }

        .tech-title {
          flex: 1;
          font-weight: 500;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .status-not-started {
          background: #9ca3af;
          color: white;
        }

        .status-in-progress {
          background: #f59e0b;
          color: white;
        }

        .status-completed {
          background: #10b981;
          color: white;
        }

        .form-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn-primary:hover:not(:disabled) {
          background: #2563eb;
        }

        .btn-primary:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #6b7280;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn-secondary:hover {
          background: #4b5563;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 768px) {
          .form-actions {
            flex-direction: column;
          }

          .technologies-checkbox-list {
            max-height: 200px;
          }
        }
      `}</style>
    </div>
  );
}

export default TechnologyList;
