export type TodoType = {
  id: number;
  text: string;
  completed: boolean;
};

export type PhaseType = {
  id: number;
  name: string;
  todos: TodoType[];
  completed: boolean;
};

export type TodoInputsType = {
  [key: number]: string;
};
