import { Todo, TodoBody } from "@/shared/models/todo";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteApi, getApi, postApi, putApi } from "src/api";

export const useTodoRepository = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_URL!;
  const { getAccessTokenSilently } = useAuth0();

  const listTodos = async (): Promise<Todo[]> => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE,
      scope: process.env.NEXT_PUBLIC_AUTH0_OPENID_CONNECT_SCOPE,
    });
    const response = await getApi(`${baseUrl}/todos`, accessToken);
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
    const response = await postApi(`${baseUrl}/todos`, accessToken, body);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as Todo;
  };

  const updateTodo = async (id: string, body: Todo): Promise<Todo> => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE,
      scope: process.env.NEXT_PUBLIC_AUTH0_OPENID_CONNECT_SCOPE,
    });
    const response = await putApi(`${baseUrl}/todos/${id}`, accessToken, body);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as Todo;
  };

  const deleteTodo = async (id: string): Promise<void> => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE,
      scope: process.env.NEXT_PUBLIC_AUTH0_OPENID_CONNECT_SCOPE,
    });
    const response = await deleteApi(`${baseUrl}/todos/${id}`, accessToken);
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
