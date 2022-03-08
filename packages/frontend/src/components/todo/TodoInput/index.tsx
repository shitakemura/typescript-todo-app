import { Button, HStack, Input } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "src/store/todo";

const TodoInput = () => {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState);
  const resetInputValue = useCallback(() => setInputValue(""), []);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );

  const handleAddTodo = useCallback(() => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: Date.now().toString(),
        title: inputValue,
        completed: false,
      },
    ]);
    resetInputValue();
  }, [inputValue, setTodoList, resetInputValue]);

  return (
    <HStack spacing={6}>
      <Input
        borderColor='teal.500'
        borderWidth={2}
        height={12}
        width={400}
        onChange={handleOnChange}
      />
      <Button paddingX={8} colorScheme='teal' onClick={handleAddTodo}>
        Add Todo
      </Button>
    </HStack>
  );
};

export default TodoInput;
