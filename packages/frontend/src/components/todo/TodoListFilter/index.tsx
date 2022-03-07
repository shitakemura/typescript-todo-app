import { Filter, FILTER_VALUES } from "../TodoList";

type Props = {
  filter: Filter;
};

const TodoListFilter = ({ filter }: Props) => {
  return (
    <div>
      {FILTER_VALUES.map((filterValue) => {
        return (
          <button type='button' key={filterValue}>
            {filterValue}
          </button>
        );
      })}
    </div>
  );
};

export default TodoListFilter;
