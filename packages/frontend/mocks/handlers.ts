import { Todo, TodoBody } from "@/shared/models/todo";
import { rest } from "msw";

let todos: Todo[] = [
  { id: "id001", title: "mock todo1", completed: false },
  { id: "id002", title: "mock todo2", completed: true },
  { id: "id003", title: "mock todo3", completed: false },
];

export const handlers = [
  rest.get(`/todos`, (req, res, ctx) => {
    const accessToken = req.headers.get("Authorization");
    console.log(`accessToken: ${accessToken}`);

    return res(ctx.status(200), ctx.json(todos));
  }),

  rest.post(`/todos`, (req, res, ctx) => {
    const body = req.body as TodoBody;
    return res(
      ctx.status(201),
      ctx.json({ ...body, id: Date.now().toString() })
    );
  }),

  rest.put(`/todos`, (req, res, ctx) => {
    const { id } = req.params;
    const body = req.body as Todo;
    return res(ctx.status(200), ctx.json(body));
  }),

  rest.delete(`/todos`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];
