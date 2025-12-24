const API_BASE = "http://localhost:5000/api";

export const api = async (url, method = "GET", body, token) => {
  const res = await fetch(`${API_BASE}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: body ? JSON.stringify(body) : null
  });

  return res.json();
};
