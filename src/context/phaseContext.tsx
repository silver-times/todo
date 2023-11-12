import React, { createContext, useContext, useState } from "react";
import type { PhaseType } from "../types";

type PhaseContextType = {
  phases: PhaseType[];
  completedPhases: number[];
  addPhase: (name: string) => void;
  addTodo: (phaseId: number, text: string) => void;
  toggleTodo: (phaseId: number, todoId: number) => void;
};

const PhaseContext = createContext<PhaseContextType>({
  phases: [],
  completedPhases: [],
  addPhase: () => {},
  addTodo: () => {},
  toggleTodo: () => {},
});

interface ChildrenProps {
  children: React.ReactNode;
}

export const PhaseContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [phases, setPhases] = useState<PhaseType[]>([]);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);

  const addPhase = (name: string) => {
    const newPhase: PhaseType = {
      id: Math.floor(Math.random() * 1000),
      name,
      todos: [],
      completed: false,
    };
    setPhases((prevPhases) => [...prevPhases, newPhase]);
  };

  const addTodo = (phaseId: number, text: string) => {
    // Implement your logic to add a todo to the specified phase
  };

  const toggleTodo = (phaseId: number, todoId: number) => {
    // Implement your logic to toggle the completion status of a todo
  };

  return (
    <PhaseContext.Provider
      value={{ phases, completedPhases, addPhase, addTodo, toggleTodo }}
    >
      {children}
    </PhaseContext.Provider>
  );
};

// Create a custom hook for using the App context
export const usePhaseContext = () => {
  const context = useContext(PhaseContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
