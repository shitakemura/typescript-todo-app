import { VStack, List, ListItem } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filteredTodoListState, todoListState } from "src/store/todo";
import TodoInput from "../TodoInput";
import TodoListFilter from "../TodoListFilter";
import TodoItem from "../TodoItem";
import { useListTodos } from "src/usecases/todo/useListTodos";
import { useEffect } from "react";

const TodoList = () => {
  const { data } = useListTodos();
  const setTodoList = useSetRecoilState(todoListState);
  const todoList = useRecoilValue(filteredTodoListState);

  useEffect(() => {
    if (!data) return;
    setTodoList(data);
  }, [data, setTodoList]);

  return (
    <VStack w='full' spacing={10} paddingX={48} paddingY={16}>
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
