import { env } from "./env";

type RequestInitWithAuth = Omit<RequestInit, "body"> & {
  authCookie?: string;
  body?: any;
};

// eslint-disable-next-line no-unused-vars
type Request = <T>(path: string, options?: RequestInitWithAuth) => Promise<T>;

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export class Api {
  private baseUrl = "";

  constructor() {
    this.baseUrl = `${env.NEXT_PUBLIC_COOLIFY_API_URL}/${env.NEXT_PUBLIC_COOLIFY_API_VERSION}`;
  }

  private handleRequest = async <T>({
    method,
    path,
    requestInit,
  }: {
    method: RequestMethod;
    path: string;
    requestInit?: RequestInitWithAuth;
  }) => {
    const body = requestInit?.body;

    return await fetch(`${this.baseUrl}${path}`, {
      method: method,
      ...requestInit,
      ...(body && { body: JSON.stringify(body) }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...requestInit?.headers,
      },
    }).then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        let code = data?.code ?? "unknown";
        let message = data?.message ?? "An unknown error occurred.";
        throw new ApiError(code, message);
      }

      return data as T;
    });
  };

  public get: Request = async <T>(
    path: string,
    options?: RequestInitWithAuth,
  ) => {
    return await this.handleRequest<T>({
      method: "GET",
      path,
      requestInit: options,
    });
  };

  public post: Request = async <T>(
    path: string,
    options?: RequestInitWithAuth,
  ) => {
    return await this.handleRequest<T>({
      method: "POST",
      path,
      requestInit: options,
    });
  };

  public put: Request = async <T>(
    path: string,
    options?: RequestInitWithAuth,
  ) => {
    return await this.handleRequest<T>({
      method: "PUT",
      path,
      requestInit: options,
    });
  };

  public delete: Request = async <T>(
    path: string,
    options?: RequestInitWithAuth,
  ) => {
    return await this.handleRequest<T>({
      method: "DELETE",
      path,
      requestInit: options,
    });
  };

  public patch: Request = async <T>(
    path: string,
    options?: RequestInitWithAuth,
  ) => {
    return await this.handleRequest<T>({
      method: "PATCH",
      path,
      requestInit: options,
    });
  };
}

export const api = new Api();

export const QUERY_KEYS = {
  USERS: "users",

  TEAMS: "teams",

  PROJECTS: "projects",
  PROJECT: "project",
} as const;

export class ApiError {
  public code: string;
  public message: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }
}
