import { Button, HStack } from "@chakra-ui/react";
import { Filter, FILTER_VALUES } from "../TodoList";

type Props = {
  filter: Filter;
};

const TodoListFilter = ({ filter }: Props) => {
  return (
    <HStack spacing={4}>
      {FILTER_VALUES.map((filterValue) => {
        return (
          <Button
            key={filterValue}
            colorScheme={filter === filterValue ? "teal" : undefined}
            color={filter === filterValue ? "white" : undefined}>
            {filterValue}
          </Button>
        );
      })}
    </HStack>
  );
};

export default TodoListFilter;
