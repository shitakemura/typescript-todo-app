import { Todo, TodoBody } from "@/shared/models/todo";
import { useAuth0 } from "@auth0/auth0-react";

export const useTodoRepository = () => {
  const { getAccessTokenSilently } = useAuth0();

  const listTodos = async (): Promise<Todo[]> => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE,
      scope: process.env.NEXT_PUBLIC_AUTH0_OPENID_CONNECT_SCOPE,
    });
    const response = await fetch("/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as Todo[];
  };

  const createTodo = async (body: TodoBody): Promise<Todo> => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE,
      scope: process.env.NEXT_PUBLIC_AUTH0_OPENID_CONNECT_SCOPE,
    });
    const response = await fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as Todo;
  };

  const updateTodo = async (body: Todo): Promise<Todo> => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE,
      scope: process.env.NEXT_PUBLIC_AUTH0_OPENID_CONNECT_SCOPE,
    });
    const response = await fetch("/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as Todo;
  };

  const deleteTodo = async (): Promise<void> => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE,
      scope: process.env.NEXT_PUBLIC_AUTH0_OPENID_CONNECT_SCOPE,
    });
    const response = await fetch("/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  };

  return {
    listTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};
