export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodoBody = Omit<Todo, "id">;
