import { Todo } from "@/shared/models/todo";
import { atom, selector } from "recoil";
import { Filter } from "src/models/filter";

export const todoListState = atom({
  key: "todoListState",
  default: [
    { id: "id001", title: "Learn React", completed: true },
    { id: "id002", title: "Learn TypeScript", completed: false },
  ] as Todo[],
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "ALL" as Filter,
});

export const filteredTodoListState = selector({
  key: "filtredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "ALL":
        return list;
      case "COMPLETED":
        return list.filter((item) => item.completed);
      case "NOT COMPLETED":
        return list.filter((item) => !item.completed);
    }
  },
});
