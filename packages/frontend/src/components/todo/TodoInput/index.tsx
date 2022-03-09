import React, { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Button, HStack, Input } from "@chakra-ui/react";
import { TodoBody } from "@/shared/models/todo";
import { todoListState } from "src/store/todo";
import { useCreateTodo } from "src/usecases/todo/useCreateTodo";

const TodoInput = () => {
  const { isLoading, createTodo } = useCreateTodo();
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState);
  const resetInputValue = useCallback(() => setInputValue(""), []);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );

  const handleAddTodo = useCallback(async () => {
    const body: TodoBody = { title: inputValue, completed: false };
    const newTodo = await createTodo(body);
    setTodoList((oldTodoList) => [...oldTodoList, newTodo!]);
    resetInputValue();
  }, [inputValue, createTodo, setTodoList, resetInputValue]);

  return (
    <HStack spacing={6}>
      <Input
        borderColor='teal.500'
        borderWidth={2}
        height={12}
        width={400}
        value={inputValue}
        onChange={handleOnChange}
      />
      <Button
        paddingX={8}
        colorScheme='teal'
        isLoading={isLoading}
        onClick={handleAddTodo}>
        Add Todo
      </Button>
    </HStack>
  );
};

export default TodoInput;
