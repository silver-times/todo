import React, { createContext, useContext, useState, useEffect } from "react";
import type { PhaseType } from "../types";

type PhaseContextType = {
  phases: PhaseType[];
  setPhases: React.Dispatch<React.SetStateAction<PhaseType[]>>;
  completedPhases: number[];
  setCompletedPhases: React.Dispatch<React.SetStateAction<number[]>>;
  addPhase: (name: string) => void;
  addTodo: (text: string, id: number) => void;
  toggleTodo: (phaseId: number, todoId: number) => void;
  funfact: string;
};

const PhaseContext = createContext<PhaseContextType>({
  phases: [],
  setPhases: () => {},
  completedPhases: [],
  setCompletedPhases: () => {},
  addPhase: () => {},
  addTodo: () => {},
  toggleTodo: () => {},
  funfact: "",
});

interface ChildrenProps {
  children: React.ReactNode;
}

export const PhaseContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [phases, setPhases] = useState<PhaseType[]>([]);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [funfact, setFunfact] = useState<string>("");

  const addPhase = (name: string) => {
    const newPhase: PhaseType = {
      id: Math.floor(Math.random() * 1000),
      name,
      todos: [],
      completed: false,
    };
    setPhases((prevPhases) => {
      const newPhases = [...prevPhases, newPhase];
      localStorage.setItem("phases", JSON.stringify(newPhases));
      return newPhases;
    });
  };

  const addTodo = (text: string, id: number) => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      text,
      completed: false,
    };
    const phaseIndex = phases.findIndex((phase) => phase.id === id);
    const newPhases = [...phases];
    newPhases[phaseIndex].todos.push(newTodo);
    setPhases(newPhases);
    updateLocalStorage(newPhases);
  };

  const toggleTodo = (phaseId: number, todoId: number) => {
    const phaseIndex = phases.findIndex((phase) => phase.id === phaseId);
    const newPhases = [...phases];

    const todoIndex = newPhases[phaseIndex].todos.findIndex(
      (todo) => todo.id === todoId
    );

    newPhases[phaseIndex].todos[todoIndex] = {
      ...newPhases[phaseIndex].todos[todoIndex],
      completed: !newPhases[phaseIndex].todos[todoIndex].completed,
    };

    newPhases[phaseIndex].completed = newPhases[phaseIndex].todos.every(
      (todo) => todo.completed
    );

    if (newPhases[phaseIndex].completed) {
      if (!completedPhases.includes(phaseId)) {
        setCompletedPhases((prev) => [...prev, phaseId]);
      }
      if (newPhases.every((phase) => phase.completed)) {
        displayFact();
      }
    } else {
      const phaseIndexInCompleted = completedPhases.indexOf(phaseId);
      if (phaseIndexInCompleted !== -1) {
        const updatedCompletedPhases = completedPhases.slice(
          0,
          phaseIndexInCompleted
        );
        setCompletedPhases(updatedCompletedPhases);
      }
    }

    setPhases(newPhases);
    updateLocalStorage(newPhases);
  };

  const updateLocalStorage = (phases: PhaseType[]) => {
    localStorage.setItem("phases", JSON.stringify(phases));
  };

  const displayFact = async () => {
    const response = await fetch("https://uselessfacts.jsph.pl/random.json");
    const data = await response.json();
    setFunfact(data.text);
  };

  useEffect(() => {
    const localPhases = localStorage.getItem("phases");
    if (localPhases) {
      setPhases(JSON.parse(localPhases));
    }
  }, [completedPhases]);

  return (
    <PhaseContext.Provider
      value={{
        phases,
        setPhases,
        completedPhases,
        setCompletedPhases,
        addPhase,
        addTodo,
        toggleTodo,
        funfact,
      }}
    >
      {children}
    </PhaseContext.Provider>
  );
};

export const usePhaseContext = () => {
  const context = useContext(PhaseContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
