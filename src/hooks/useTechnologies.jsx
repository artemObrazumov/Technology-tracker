import useLocalStorage from "./useLocalStorage";

const initialTechnologies = [
  {
    id: 1,
    title: "React Components",
    description: "Изучение базовых компонентов и их жизненного цикла",
    status: "completed",
    notes: "",
    category: "React Basics",
    deadline: "",
  },
  {
    id: 2,
    title: "JSX Syntax",
    description: "Освоение синтаксиса JSX и правил написания",
    status: "in-progress",
    notes: "",
    category: "React Basics",
    deadline: "",
  },
  {
    id: 3,
    title: "State Management",
    description: "Работа с состоянием компонентов через useState",
    status: "not-started",
    notes: "",
    category: "Hooks",
    deadline: "",
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

  const updateDeadlines = (deadlines) => {
    setTechnologies((prev) => {
      const deadlineMap = new Map();
      deadlines.forEach(d => deadlineMap.set(d.id, d.deadline));
      
      return prev.map(tech => {
        const newDeadline = deadlineMap.get(tech.id);
        return newDeadline !== undefined 
          ? { ...tech, deadline: newDeadline }
          : tech;
      });
    });
  };

  const batchUpdateStatuses = (ids, newStatus) => {
    setTechnologies((prev) => {
      const idsSet = new Set(ids);
      return prev.map((tech) => {
        if (idsSet.has(tech.id)) {
          return { ...tech, status: newStatus };
        }
        return tech;
      });
    });
    return Promise.resolve();
  };

  const addTechnology = (technology) => {
    setTechnologies((prev) => {
      return [...prev, { ...technology, deadline: '' }];
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

  const getDeadlineInfo = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const overdue = [];
    const upcoming = [];
    const noDeadline = [];
    
    technologies.forEach(tech => {
      if (!tech.deadline) {
        noDeadline.push(tech);
      } else {
        const deadlineDate = new Date(tech.deadline);
        deadlineDate.setHours(0, 0, 0, 0);
        
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
          overdue.push({ ...tech, daysOverdue: Math.abs(diffDays) });
        } else if (diffDays <= 7) {
          upcoming.push({ ...tech, daysLeft: diffDays });
        }
      }
    });
    
    return { overdue, upcoming, noDeadline };
  };

  return {
    technologies,
    setTechnologies,
    updateStatus,
    updateNotes,
    updateDeadlines,
    markAllAsCompleted,
    resetAllStatuses,
    progress: calculateProgress(),
    addTechnology,
    batchUpdateStatuses,
    getDeadlineInfo,
  };
}

export default useTechnologies;