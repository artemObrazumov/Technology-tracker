import { useState } from "react";
import "./App.css";
import TechnologyCard from "./components/TechnologyCard";
import ProgressHeader from "./components/ProgressHeader";
import QuickActions from "./components/QuickActions";
import FilterTabs from "./components/FilterTabs";
import ProgressBar from "./components/ProgressBar";
import useTechnologies from "./hooks/useTechnologies";

function App() {
  const { 
    technologies, 
    updateStatus, 
    updateNotes, 
    markAllAsCompleted, 
    resetAllStatuses, 
    progress 
  } = useTechnologies();

  const [activeFilter, setActiveFilter] = useState("all");

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

  const [searchQuery, setSearchQuery] = useState("");
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
    <div className="app">
      <div className="app-container">
        <ProgressHeader technologies={technologies} />

        <ProgressBar progress={progress}/>

        <QuickActions
          onMarkAllCompleted={markAllAsCompleted}
          onResetAll={resetAllStatuses}
          onPickRandom={pickRandomTechnology}
          technologies={technologies}
        />

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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
