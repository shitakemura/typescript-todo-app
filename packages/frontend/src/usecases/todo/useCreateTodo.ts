import { useState } from "react";
import { Todo, TodoBody } from "@/shared/models/todo";
import { useTodoRepository } from "src/repositories/todo";

export const useCreateTodo = () => {
  const todoRepository = useTodoRepository();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createTodo = async (body: TodoBody): Promise<Todo | undefined> => {
    try {
      setIsLoading(true);
      const todo = await todoRepository.createTodo(body);
      return todo;
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error(`Failed when create todo`));
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, createTodo };
};
