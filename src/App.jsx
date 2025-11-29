import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';

function App() {
  const technologies = [
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
      status: 'not-started' 
    }
  ];

  return (
    <div className="app">
      <div className="app-container">
        <ProgressHeader technologies={technologies} />
        
        <div className="technologies-grid">
          {technologies.map(technology => (
            <TechnologyCard
              key={technology.id}
              title={technology.title}
              description={technology.description}
              status={technology.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;