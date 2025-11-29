import { useState, useEffect } from "react";
import "./App.css";
import TechnologyCard from "./components/TechnologyCard";
import ProgressHeader from "./components/ProgressHeader";
import QuickActions from "./components/QuickActions";
import FilterTabs from "./components/FilterTabs";

function App() {
  const [technologies, setTechnologies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const setTechnologiesMocks = () => {
    setTechnologies([
      {
        id: 1,
        title: "React Components",
        description: "Изучение базовых компонентов и их жизненного цикла",
        status: "completed",
        notes: "",
      },
      {
        id: 2,
        title: "JSX Syntax",
        description: "Освоение синтаксиса JSX и правил написания",
        status: "in-progress",
        notes: "",
      },
      {
        id: 3,
        title: "State Management",
        description: "Работа с состоянием компонентов через useState",
        status: "not-started",
        notes: "",
      },
    ]);
  };

  // Загрузка данных
  useEffect(() => {
    const saved = localStorage.getItem("techTrackerData");
    if (saved) {
      setTechnologies(JSON.parse(saved));
      console.log("Данные загружены из localStorage");
    } else {
      setTechnologiesMocks();
    }
    setIsLoaded(true);
  }, []);

  // Автосохранение
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("techTrackerData", JSON.stringify(technologies));
      console.log("Данные сохранены в localStorage");
    }
  }, [technologies]);

  const [activeFilter, setActiveFilter] = useState("all");

  const updateTechnologyStatus = (id) => {
    setTechnologies((prevTech) =>
      prevTech.map((tech) => {
        if (tech.id === id) {
          let nextStatus = "not-started";
          switch (tech.status) {
            case "not-started":
              nextStatus = "in-progress";
              break;
            case "in-progress":
              nextStatus = "completed";
              break;
            case "completed":
              nextStatus = "not-started";
              break;
          }
          return { ...tech, status: nextStatus };
        }
        return tech;
      })
    );
  };

  const markAllAsCompleted = () => {
    setTechnologies((prevTech) =>
      prevTech.map((tech) => ({ ...tech, status: "completed" }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies((prevTech) =>
      prevTech.map((tech) => ({ ...tech, status: "not-started" }))
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
    updateTechnologyStatus(randomTechnology.id);
  };

  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies((prevTech) =>
      prevTech.map((tech) =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
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

        <QuickActions
          onMarkAllCompleted={markAllAsCompleted}
          onResetAll={resetAllStatuses}
          onPickRandom={pickRandomTechnology}
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
              onStatusChange={updateTechnologyStatus}
              notes={technology.notes}
              onNotesChange={updateTechnologyNotes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
