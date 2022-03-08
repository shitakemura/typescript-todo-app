import { Checkbox, HStack, IconButton, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Todo } from "@/shared/models/todo";
import { useRecoilState } from "recoil";
import { todoListState } from "src/store/todo";
import { useCallback } from "react";

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  const { id, title, completed } = todo;
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const handleToggleTodo = useCallback(() => {
    const newList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      } else {
        return item;
      }
    });
    setTodoList(newList);
  }, [id, todoList, setTodoList]);

  const handleDeleteTodo = useCallback(() => {
    const newList = todoList.filter((item) => item.id !== id);
    setTodoList(newList);
  }, [id, todoList, setTodoList]);

  return (
    <HStack
      borderColor='teal.300'
      borderWidth={1}
      p={8}
      w='full'
      height={16}
      justify='space-between'
      spacing={8}>
      <HStack spacing={8}>
        <Checkbox size='lg' isChecked={completed} onChange={handleToggleTodo} />
        <Text
          textDecoration={completed ? "line-through" : undefined}
          color={completed ? "gray.500" : "black"}>
          {title}
        </Text>
      </HStack>
      <IconButton
        aria-label='delete'
        color='teal.500'
        backgroundColor='white'
        p={4}
        boxSize={5}
        icon={<DeleteIcon />}
        onClick={handleDeleteTodo}
      />
    </HStack>
  );
};

export default TodoItem;
