const TechnologyNotes = ({ notes, onNotesChange }) => {
  return (
    <div
      className="notes-section"
      onClick={
        (e) => e.stopPropagation() // Нужен чтобы клик не менял статус карточки
      }
    >
      <h4>Мои заметки:</h4>
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
  );
};

export default TechnologyNotes;
