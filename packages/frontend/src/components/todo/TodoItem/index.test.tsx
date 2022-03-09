import { render, screen } from "@testing-library/react";
import { Todo } from "@/shared/models/todo";
import TodoItem from "./index";
import { RecoilRoot } from "recoil";

let todo: Todo = {
  userId: "user001",
  id: "id003",
  title: "test todo title",
  completed: true,
};

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

describe("TodoItem", () => {
  test("Snapshotテスト", () => {
    const { container } = render(<TodoItem todo={todo} />, { wrapper });
    expect(container).toMatchSnapshot();
  });

  test("初期表示", () => {
    render(<TodoItem todo={todo} />, { wrapper });

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText("test todo title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "delete" })).toBeInTheDocument();
  });
});
