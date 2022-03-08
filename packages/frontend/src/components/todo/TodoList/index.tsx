import { VStack, List, ListItem } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { filteredTodoListState } from "src/store/todo";
import TodoInput from "../TodoInput";
import TodoListFilter from "../TodoListFilter";
import TodoItem from "../TodoItem";

const TodoList = () => {
  const todoList = useRecoilValue(filteredTodoListState);

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
