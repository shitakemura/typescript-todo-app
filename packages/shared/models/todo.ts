export type Todo = {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
};

export type TodoBody = Omit<Todo, "userId" | "id">;
