import { VStack, List, ListItem } from "@chakra-ui/react";
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
    <VStack w='full' spacing={10} paddingX={48} paddingY={16}>
      <TodoInput />
      <TodoListFilter filter={"ALL"} />
      <List w='full' paddingX={8}>
        {todos.map((todo) => (
          <ListItem key={todo.id} paddingY={2}>
            <TodoItem todo={todo} />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default TodoList;
