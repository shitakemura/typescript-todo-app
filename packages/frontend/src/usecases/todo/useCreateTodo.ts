import { Todo, TodoBody } from "@/shared/models/todo";
import { useState } from "react";
import { useTodoRepository } from "repositories/todo";

export const useCreateTodo = () => {
  const todoRepository = useTodoRepository();
  const [error, setError] = useState<Error | null>(null);

  const createTodo = async (body: TodoBody): Promise<Todo | undefined> => {
    try {
      const todo = await todoRepository.createTodo(body);
      return todo;
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error(`Failed when create todo`));
      }
    }
  };
  return { error, createTodo };
};
