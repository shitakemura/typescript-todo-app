export const getApi = async (url: string, accessToken: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  });
  return response;
};

export const postApi = async <T>(url: string, accessToken: string, body: T) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify(body),
  });
  return response;
};

export const putApi = async <T>(url: string, accessToken: string, body: T) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify(body),
  });
  return response;
};

export const deleteApi = async <T>(url: string, accessToken: string) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  });
  return response;
};
