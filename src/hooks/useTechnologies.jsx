import useLocalStorage from "./useLocalStorage";

const initialTechnologies = [
  {
    id: 1,
    title: "React Components",
    description: "Изучение базовых компонентов и их жизненного цикла",
    status: "completed",
    notes: "",
    category: "React Basics",
  },
  {
    id: 2,
    title: "JSX Syntax",
    description: "Освоение синтаксиса JSX и правил написания",
    status: "in-progress",
    notes: "",
    category: "React Basics",
  },
  {
    id: 3,
    title: "State Management",
    description: "Работа с состоянием компонентов через useState",
    status: "not-started",
    notes: "",
    category: "Hooks",
  },
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage(
    "technologies",
    initialTechnologies
  );

  const updateStatus = (techId) => {
    setTechnologies((prev) =>
      prev.map((tech) => {
        if (tech.id === techId) {
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

  const addTechnology = (technology) => {
    setTechnologies((prev) => {
      return [ ...prev, technology ];
    });
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(
      (tech) => tech.status === "completed"
    ).length;
    return Math.round((completed / technologies.length) * 100);
  };

  const markAllAsCompleted = () => {
    setTechnologies((prev) =>
      prev.map((tech) => ({ ...tech, status: "completed" }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies((prev) =>
      prev.map((tech) => ({ ...tech, status: "not-started" }))
    );
  };

  return {
    technologies,
    updateStatus,
    updateNotes,
    markAllAsCompleted,
    resetAllStatuses,
    progress: calculateProgress(),
    addTechnology
  };
}

export default useTechnologies;
