import { useState } from "react";
import { Todo } from "@/shared/models/todo";
import { useTodoRepository } from "src/repositories/todo";

export const useUpdateTodo = () => {
  const todoRepository = useTodoRepository();
  const [error, setError] = useState<Error | null>(null);

  const updateTodo = async (id: string, body: Todo) => {
    try {
      const todo = await todoRepository.updateTodo(id, body);
      return todo;
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error(`Failed when update todo`));
      }
    }
  };
  return { error, updateTodo };
};
