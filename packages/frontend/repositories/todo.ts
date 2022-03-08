import { Todo, TodoBody } from "@/shared/models/todo";

export const useTodoRepository = () => {
  const listTodos = async (): Promise<Todo[]> => {
    const response = await fetch("/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as Todo[];
  };

  const createTodo = async (body: TodoBody): Promise<Todo> => {
    const response = await fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as Todo;
  };

  return {
    listTodos,
    createTodo,
  };
};
