import { RecoilRoot } from "recoil";
import TodoList from "src/components/todo/TodoList";

export default function Home() {
  return (
    <div>
      <RecoilRoot>
        <TodoList />
      </RecoilRoot>
    </div>
  );
}
