import { useState, useRef } from "react";
import Modal from "./Modal";
import "./QuickActions.css";
import { useNotification } from "./NotificationProvider";

function QuickActions({
  onMarkAllCompleted,
  onResetAll,
  onPickRandom,
  technologies,
  onImportData,
}) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importStatus, setImportStatus] = useState({
    success: false,
    message: "",
    count: 0,
  });
  const fileInputRef = useRef(null);
  const showNotification = useNotification();

  const handleMarkAllCompleted = () => {
    onMarkAllCompleted();
    showNotification("Все технологии отмечены как выполненные!", "success");
  };

  const handleResetAll = () => {
    onResetAll();
    showNotification("Все статусы сброшены!", "warning");
  };

  const handlePickRandom = () => {
    onPickRandom();
    showNotification("Случайная технология выбрана!", "info");
  };

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies: technologies,
    };
    const dataStr = JSON.stringify(data, null, 2);

    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tech-tracker-export-${new Date()
      .toISOString()
      .split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setShowExportModal(true);
    showNotification("Данные успешно экспортированы!", "success");
  };

  const handleImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        if (
          !importedData.technologies ||
          !Array.isArray(importedData.technologies)
        ) {
          throw new Error("Неверный формат файла. Ожидается массив technologies.");
        }

        const isValidData = importedData.technologies.every(
          (tech) => tech && typeof tech === "object" && "title" in tech
        );

        if (!isValidData) {
          throw new Error("Некорректная структура данных в файле.");
        }

        if (onImportData) {
          onImportData(importedData.technologies);
        }

        setImportStatus({
          success: true,
          message: "Данные успешно импортированы",
          count: importedData.technologies.length,
        });
        showNotification("Данные успешно импортированы!", "success");
      } catch (error) {
        setImportStatus({
          success: false,
          message: error.message || "Ошибка при импорте файла",
          count: 0,
        });
        showNotification(
          error.message || "Ошибка при импорте файла",
          "error"
        );
      } finally {
        setShowImportModal(true);
        event.target.value = "";
      }
    };

    reader.onerror = () => {
      setImportStatus({
        success: false,
        message: "Ошибка чтения файла",
        count: 0,
      });
      setShowImportModal(true);
      showNotification("Ошибка чтения файла", "error");
      event.target.value = "";
    };

    reader.readAsText(file);
  };

  const handleCloseImportModal = () => {
    setShowImportModal(false);
    setImportStatus({ success: false, message: "", count: 0 });
  };

  return (
    <div className="quick-actions">
      <h3 className="quick-actions__title">Быстрые действия</h3>
      <div className="quick-actions__buttons">
        <button
          className="quick-action-btn quick-action-btn--complete"
          onClick={handleMarkAllCompleted}
        >
          Отметить все как выполненные
        </button>
        <button
          className="quick-action-btn quick-action-btn--reset"
          onClick={handleResetAll}
        >
          Сбросить все статусы
        </button>
        <button
          className="quick-action-btn quick-action-btn--random"
          onClick={handlePickRandom}
        >
          Случайный выбор
        </button>
        <button
          className="quick-action-btn quick-action-btn--export"
          onClick={handleExport}
        >
          Экспорт
        </button>
        <button
          className="quick-action-btn quick-action-btn--import"
          onClick={handleImport}
        >
          Импорт
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

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

      <Modal
        isOpen={showImportModal}
        onClose={handleCloseImportModal}
        title="Импорт данных"
      >
        <div className="import-modal-content">
          {importStatus.success ? (
            <>
              <p className="import-success">{importStatus.message}</p>
              <button
                onClick={handleCloseImportModal}
                className="quick-action-btn quick-action-btn--success"
              >
                Продолжить
              </button>
            </>
          ) : (
            <>
              <p className="import-error">{importStatus.message}</p>
              <p>
                Убедитесь, что файл соответствует формату экспорта этого
                приложения.
              </p>
              <button
                onClick={handleCloseImportModal}
                className="quick-action-btn quick-action-btn--error"
              >
                Закрыть
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default QuickActions;