import { useState } from "react";
import { usePhaseContext } from "./context/phaseContext";
import AddTodoIcon from "./assets/addTodoIcon.svg";
import CheckIcon from "./assets/checkIcon.svg";
import DeleteIcon from "./assets/deleteIcon.svg";
import GithubIcon from "./assets/githubIcon.svg";
import { Alert } from "./components/Alert";

export const App = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [phaseInput, setPhaseInput] = useState<string>("");
  const [todoInput, setTodoInput] = useState<string>("");
  const { phases, completedPhases, addPhase, addTodo, toggleTodo, funfact } =
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
    <div className="w-screen h-screen">
      {funfact && <Alert funfact={funfact} />}
      <div className="container mx-auto mt-16 flex flex-col justify-center items-center w-[50%] rounded-lg shadow-2xl bg-white ">
        <div className="w-full">
          <h1 className="text-4xl text-center my-4 font-extrabold">
            My startup's progress
          </h1>
          <a
            href="https://github.com/silver-times/todo"
            target="_blank"
            className="flex items-center justify-center cursor-pointer gap-2 -mt-5 mb-8"
          >
            <img className="h-6 w-6" src={GithubIcon} alt="Github code" />
            <h1 className="text-md text-center my-4 font-extrabold">
              GitHub Repository
            </h1>
          </a>

          <div className="flex flex-col items-center justify-center gap-y-5 p-5 ">
            <div className="flex">
              {showInput ? (
                <div className="flex gap-4">
                  <form onSubmit={handlePhaseInput}>
                    <input
                      required
                      type="text"
                      value={phaseInput}
                      onChange={(e) => setPhaseInput(e.target.value)}
                      placeholder="Enter phase!"
                      className="px-4 py-2 border border-sky-600"
                    />
                    <button
                      type="submit"
                      className="border border-sky-600 bg-sky-600 text-white px-4 py-2 ml-2"
                    >
                      Add Phase
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex gap-8">
                  <div
                    onClick={() => setShowInput(true)}
                    className="flex items-center justify-center gap-2 cursor-pointer transition duration-300 ease-out hover:scale-95 hover:ease-in"
                  >
                    <img
                      className="h-8 w-8"
                      src={AddTodoIcon}
                      alt="add-todo-icon"
                    />
                    <p className="text-lg hover:text-2xl">Add Phase</p>
                  </div>
                  <div
                    onClick={() => localStorage.clear()}
                    className="flex items-center justify-center gap-2 cursor-pointer transition duration-300 ease-out hover:scale-95 hover:ease-in"
                  >
                    <img
                      className="h-8 w-8"
                      src={DeleteIcon}
                      alt="add-todo-icon"
                    />
                    <p className="text-lg hover:text-2xl">Clear Progress</p>
                  </div>
                </div>
              )}
            </div>

            {phases.map((phase, index) => (
              <div key={phase.id} className="flex flex-col gap-2 py-4">
                <div className="flex items-center justify-start gap-4">
                  <h2 className="text-2xl bg-black text-white rounded-full w-12 h-12 flex items-center justify-center">
                    {index + 1}
                  </h2>
                  <h2 className="text-2xl">{phase.name}</h2>
                  <h2 className="text-3xl">
                    {completedPhases.includes(phase.id) ? (
                      <img
                        className="h-12 w-12"
                        src={CheckIcon}
                        alt="add-todo-icon"
                      />
                    ) : (
                      ""
                    )}
                  </h2>
                </div>
                <div className="flex flex-col gap-2 p-4">
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
                    required
                    type="text"
                    value={todoInput}
                    placeholder="Enter task..."
                    className="px-4 py-2 border border-sky-600"
                    onChange={(e) => setTodoInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="border border-sky-600 bg-sky-600 text-white px-4 py-2 ml-2"
                  >
                    Add Task
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
