const BASE_URL = "http://localhost:3000/";

export const fetchFunction = async (url, options = {}) => {
  let token = localStorage.getItem("accessToken");

  const authOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  let res = await fetch(`${BASE_URL}${url}`, authOptions);

  if (res.status === 401) {
    const refreshRes = await fetch(`${BASE_URL}auth/refresh`, {
      ...authOptions,
      method: "post",
    });
    if (refreshRes.status === 401) {
      throw new Error("refreshFail");
    } else {
      const data = await refreshRes.json();
      const newAccessToken = data.data.accessToken;
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", newAccessToken);
      authOptions.headers["Authorization"] = `Bearer ${newAccessToken}`;
      res = await fetch(`${BASE_URL}${url}`, authOptions);
      return res;
    }
  }
  if (!res.ok) {
    throw new Error(res.message);
  }
  return res;
};
