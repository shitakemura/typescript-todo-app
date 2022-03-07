import { Todo } from "@/shared/models/todo";

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  return (
    <div>
      <input type='checkbox' />
      <label>{todo.title}</label>
      <button type='button'>Delete</button>
    </div>
  );
};

export default TodoItem;
