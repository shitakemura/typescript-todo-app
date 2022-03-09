import useSWR from "swr";
import { Todo } from "@/shared/models/todo";
import { useTodoRepository } from "src/repositories/todo";

export const useListTodos = () => {
  const todoRepository = useTodoRepository();
  return useSWR<Todo[]>("/todos", () => todoRepository.listTodos());
};
