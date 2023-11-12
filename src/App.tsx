import { useState } from "react";
import { usePhaseContext } from "./context/phaseContext";

export const App = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [phaseInput, setPhaseInput] = useState<string>("");
  const [todoInput, setTodoInput] = useState<string>("");
  const { phases, completedPhases, addPhase, addTodo, toggleTodo } =
    usePhaseContext();

  const handlePhaseInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPhase(phaseInput);
    setPhaseInput("");
    setShowInput(false);
  };

  const handleTodoInput = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    addTodo(todoInput, id);
    setTodoInput("");
  };

  const handleTodoToggle = (phaseId: number, todoId: number) => {
    toggleTodo!(phaseId, todoId);
  };

  const isCurrentPhaseEnabled = (index: number) => {
    if (index === 0) return true;
    for (let i = 0; i < index; i++) {
      const previousPhase = phases[i];
      if (!previousPhase.completed) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-6xl text-center p-4">Startup's Todo</h1>
      <div className="flex justify-center items-center px-16 my-8 gap-20">
        <div className="w-full bg-green-900 flex flex-col items-center justify-center gap-y-5 p-5">
          <div className="flex">
            <button
              onClick={() => setShowInput(!showInput)}
              className="text-4xl bg-green-900"
            >
              ✏️
            </button>
            {showInput && (
              <div className="flex gap-4">
                <form onSubmit={handlePhaseInput}>
                  <input
                    type="text"
                    value={phaseInput}
                    onChange={(e) => setPhaseInput(e.target.value)}
                    placeholder="Enter phase!"
                    className="px-4 py-2 border border-teal-100"
                  />
                  <button
                    type="submit"
                    className="border border-teal-100 px-4 py-2 ml-2"
                  >
                    Add Phase
                  </button>
                </form>
              </div>
            )}
          </div>

          {phases.map((phase, index) => (
            <div key={phase.id} className="flex flex-col gap-2">
              <h2 className="text-3xl">
                #{index + 1}: {phase.name}{" "}
                {completedPhases.includes(phase.id) ? "✅" : ""}
              </h2>
              <div className="flex flex-col gap-2">
                {phase.todos.map((todo) => (
                  <div key={todo.id} className="flex items-center gap-2">
                    <p className="text-xl">
                      <input
                        type="checkbox"
                        disabled={!isCurrentPhaseEnabled(index)}
                        checked={todo.completed}
                        className="mr-4 h-6 w-6 cursor-pointer"
                        onChange={() => handleTodoToggle(phase.id, todo.id)}
                      />
                      {todo.text}
                    </p>
                  </div>
                ))}
              </div>
              <form onSubmit={(e) => handleTodoInput(e, phase.id)}>
                <input
                  type="text"
                  value={todoInput}
                  placeholder="Enter todo!"
                  className="px-4 py-2 border border-teal-100"
                  onChange={(e) => setTodoInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="border border-teal-100 px-4 py-2 ml-2"
                >
                  Add Todo
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
