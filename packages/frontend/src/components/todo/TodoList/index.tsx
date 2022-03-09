import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { VStack, List, ListItem } from "@chakra-ui/react";
import { filteredTodoListState, todoListState } from "src/store/todo";
import { useListTodos } from "src/usecases/todo/useListTodos";
import TodoInput from "../TodoInput";
import TodoListFilter from "../TodoListFilter";
import TodoItem from "../TodoItem";

const TodoList = () => {
  const { data } = useListTodos();
  const setTodoList = useSetRecoilState(todoListState);
  const todoList = useRecoilValue(filteredTodoListState);

  useEffect(() => {
    if (!data) return;
    setTodoList(data);
  }, [data, setTodoList]);

  return (
    <VStack alignItems='stretch' paddingX={[8, 24, 36, 64]} spacing={12}>
      <TodoInput />
      <TodoListFilter />
      <List w='full' paddingX={8}>
        {todoList.map((todo) => (
          <ListItem key={todo.id} paddingY={2}>
            <TodoItem todo={todo} />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default TodoList;
