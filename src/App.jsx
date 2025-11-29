import { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterTabs from './components/FilterTabs';

function App() {
  const [technologies, setTechnologies] = useState([
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение базовых компонентов и их жизненного цикла', 
      status: 'completed' 
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX и правил написания', 
      status: 'in-progress' 
    },
    { 
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов через useState', 
      status: 'not-started',
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const updateTechnologyStatus = (id) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => {
        if (tech.id === id) {
          let nextStatus = "not-started"
          switch (tech.status) {
            case 'not-started': 
              nextStatus = "in-progress"
              break;
            case 'in-progress':
              nextStatus = "completed"
              break;
            case 'completed':
              nextStatus = "not-started"
              break;
          }
          return { ...tech, status: nextStatus };
        }
        return tech;
      })
    );
  };

  const markAllAsCompleted = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  const pickRandomTechnology = () => {
    const notStartedTechnologies = technologies.filter(tech => tech.status === 'not-started');
    const randomTechnology = notStartedTechnologies[Math.floor(Math.random() * notStartedTechnologies.length)];
    updateTechnologyStatus(randomTechnology.id);
  };

  const filteredTechnologies = technologies.filter(tech => {
    switch (activeFilter) {
      case 'not-started':
        return tech.status === 'not-started';
      case 'in-progress':
        return tech.status === 'in-progress';
      case 'completed':
        return tech.status === 'completed';
      default:
        return true;
    }
  });

  return (
    <div className="app">
      <div className="app-container">
        <ProgressHeader technologies={technologies} />
        
        <QuickActions
          onMarkAllCompleted={markAllAsCompleted}
          onResetAll={resetAllStatuses}
          onPickRandom={pickRandomTechnology}
        />

        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          technologies={technologies}
        />
        
        <div className="technologies-grid">
          {filteredTechnologies.map(technology => (
            <TechnologyCard
              key={technology.id}
              id={technology.id}
              title={technology.title}
              description={technology.description}
              status={technology.status}
              onStatusChange={updateTechnologyStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;