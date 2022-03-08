import { Button, HStack, Input } from "@chakra-ui/react";

const TodoInput = () => {
  return (
    <HStack spacing={6}>
      <Input borderColor='teal.500' borderWidth={2} height={12} width={400} />
      <Button paddingX={8} colorScheme='teal'>
        Add Todo
      </Button>
    </HStack>
  );
};

export default TodoInput;
