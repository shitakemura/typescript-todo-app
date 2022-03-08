import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Checkbox, HStack, IconButton, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Todo } from "@/shared/models/todo";
import { todoListState } from "src/store/todo";
import { useUpdateTodo } from "src/usecases/todo/useUpdateTodo";
import { useDeleteTodo } from "src/usecases/todo/useDeleteTodo";

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  const { updateTodo } = useUpdateTodo();
  const { deleteTodo } = useDeleteTodo();
  const { id, title, completed } = todo;
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const handleToggleTodo = useCallback(async () => {
    const body: Todo = { id, title, completed: !completed };
    const updatedTodo = await updateTodo(body);

    const newList = todoList.map((item) => {
      if (item.id === id) {
        return updatedTodo!;
      } else {
        return item;
      }
    });
    setTodoList(newList);
  }, [id, title, completed, todoList, updateTodo, setTodoList]);

  const handleDeleteTodo = useCallback(async () => {
    await deleteTodo();
    const newList = todoList.filter((item) => item.id !== id);
    setTodoList(newList);
  }, [id, todoList, deleteTodo, setTodoList]);

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
