import { useState } from "react";
import { useTodoRepository } from "src/repositories/todo";

export const useDeleteTodo = () => {
  const todoRepository = useTodoRepository();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteTodo = async (id: string) => {
    try {
      setIsLoading(true);
      await todoRepository.deleteTodo(id);
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error(`Failed when delete todo`));
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, deleteTodo };
};
