import React from "react";
import { useRecoilState } from "recoil";
import { Button, HStack } from "@chakra-ui/react";
import { FILTER_VALUES } from "src/models/filter";
import { todoListFilterState } from "src/store/todo";

const TodoListFilter = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  return (
    <HStack spacing={4}>
      {FILTER_VALUES.map((filterValue) => {
        return (
          <Button
            key={filterValue}
            colorScheme={filter === filterValue ? "teal" : undefined}
            color={filter === filterValue ? "white" : undefined}
            value={filterValue}
            onClick={() => setFilter(filterValue)}>
            {filterValue}
          </Button>
        );
      })}
    </HStack>
  );
};

export default TodoListFilter;
