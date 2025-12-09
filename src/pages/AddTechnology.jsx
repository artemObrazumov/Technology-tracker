import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import './AddTechnology.css';

function AddTechnology() {
  const navigate = useNavigate();
  const { addTechnology } = useTechnologies();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'not-started',
    notes: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTechnology = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };
    addTechnology(newTechnology);
    navigate('/technologies');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="page add-technology-page">
      <div className="page-header">
        <h1>Добавить новую технологию</h1>
      </div>

      <form onSubmit={handleSubmit} className="technology-form">
        <div className="form-group">
          <label htmlFor="title">Название технологии</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Например: React, Node.js"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Опишите, что вы планируете изучить..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Начальный статус</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="not-started">Не начато</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершено</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Добавить технологию
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;