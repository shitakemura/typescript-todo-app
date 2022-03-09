import { Todo, TodoBody } from "@/shared/models/todo";
import { rest } from "msw";

let todos: Todo[] = [
  { userId: "user001", id: "id001", title: "mock todo1", completed: false },
  { userId: "user001", id: "id002", title: "mock todo2", completed: true },
  { userId: "user001", id: "id003", title: "mock todo3", completed: false },
  { userId: "user002", id: "id004", title: "user2's todo", completed: true },
];

export const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/todos`,
    (req, res, ctx) => {
      const accessToken = req.headers.get("Authorization");
      console.log(`accessToken: ${accessToken}`);
      return res(
        ctx.status(200),
        ctx.json(todos.filter((todo) => todo.userId === "user001"))
      );
    }
  ),

  rest.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/todos`,
    (req, res, ctx) => {
      const body = req.body as TodoBody;
      return res(
        ctx.status(201),
        ctx.json({ ...body, userId: "user001", id: Date.now().toString() })
      );
    }
  ),

  rest.put(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/todos`,
    (req, res, ctx) => {
      const { id } = req.params;
      const body = req.body as Todo;
      return res(ctx.status(200), ctx.json(body));
    }
  ),

  rest.delete(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/todos`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    }
  ),
];
