import { useState } from "react";
import { useTodoRepository } from "src/repositories/todo";

export const useDeleteTodo = () => {
  const todoRepository = useTodoRepository();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteTodo = async (id: string): Promise<true | undefined> => {
    try {
      setIsLoading(true);
      await todoRepository.deleteTodo(id);
      return true;
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
