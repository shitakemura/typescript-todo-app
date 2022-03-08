import { Todo } from "@/shared/models/todo";
import { rest } from "msw";

let todos: Todo[] = [
  { id: "id001", title: "mock todo1", completed: false },
  { id: "id002", title: "mock todo2", completed: true },
  { id: "id003", title: "mock todo3", completed: false },
];

export const handlers = [
  rest.get(`/todos`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),
];
