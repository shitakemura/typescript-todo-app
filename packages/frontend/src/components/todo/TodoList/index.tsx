import { Todo } from "@/shared/models/todo";
import TodoInput from "../TodoInput";
import TodoListFilter from "../TodoListFilter";
import TodoItem from "../TodoItem";

export const FILTER_VALUES = ["ALL", "COMPLETED", "NOT COMPLETED"] as const;
type FilterTupel = typeof FILTER_VALUES;
export type Filter = FilterTupel[number];

const TodoList = () => {
  const todos: Todo[] = [
    { id: "id001", title: "Learn React", completed: true },
    { id: "id002", title: "Learn TypeScript", completed: false },
  ];

  return (
    <div>
      <TodoInput />
      <TodoListFilter filter={"ALL"} />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
