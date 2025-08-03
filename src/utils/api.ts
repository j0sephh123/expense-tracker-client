const API_BASE_URL = "/api/v1";

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface ApiError {
  message: string;
  status: number;
}

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export const fetcher = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const token = localStorage.getItem("authToken");

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return (await response.text()) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Network error",
      0
    );
  }
};

export const api = {
  get: <T>(endpoint: string) => fetcher<T>(endpoint),
  post: <T>(endpoint: string, data?: any) =>
    fetcher<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),
  put: <T>(endpoint: string, data?: any) =>
    fetcher<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),
  delete: <T>(endpoint: string) =>
    fetcher<T>(endpoint, {
      method: "DELETE",
    }),
};

export const auth = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new ApiError(`Login failed: ${response.status}`, response.status);
    }

    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    return data;
  },

  logout: () => {
    localStorage.removeItem("authToken");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};
