import './FilterTabs.css';

const FilterTabs = ({ activeFilter, onFilterChange, technologies }) => {
  const filters = [
    { key: 'all', label: 'Все', count: technologies.length },
    { key: 'not-started', label: 'Не начатые', count: technologies.filter(t => t.status === 'not-started').length },
    { key: 'in-progress', label: 'В процессе', count: technologies.filter(t => t.status === 'in-progress').length },
    { key: 'completed', label: 'Выполненные', count: technologies.filter(t => t.status === 'completed').length }
  ];

  return (
    <div className="filter-tabs">
      <div className="filter-tabs__header">
        <h3 className="filter-tabs__title">Фильтры</h3>
        <span className="filter-tabs__count">
          Показано: {technologies.filter(tech => {
            if (activeFilter === 'all') return true;
            return tech.status === activeFilter;
          }).length} из {technologies.length}
        </span>
      </div>
      
      <div className="filter-tabs__list">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-tab ${activeFilter === filter.key ? 'filter-tab--active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            <span className="filter-tab__label">{filter.label}</span>
            <span className="filter-tab__count">{filter.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;