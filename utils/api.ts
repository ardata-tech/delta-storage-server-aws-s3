class Api {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T = any>(endpoint: string, options: RequestInit) {
    const optionsData: RequestInit = {
      ...options,
      body: options.body instanceof FormData
        ? options.body
        : JSON.stringify(options.body),
      headers: {
        ...(options.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...options.headers,
      },
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, optionsData);

    console.log({ response, optionsData });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    return response.json();
  }

  public async get<T>(
    endpoint: string,
    options?: Omit<RequestInit, "method"> | undefined,
  ) {
    return await this.request<T>(endpoint, { ...options, method: "GET" });
  }

  public async post<T>(
    endpoint: string,
    body: any,
    options?: Omit<RequestInit, "method" | "body"> | undefined,
  ) {
    return await this.request(endpoint, {
      ...options,
      method: "POST",
      body,
    });
  }

  public async put<T>(
    endpoint: string,
    body: any,
    options?: Omit<RequestInit, "method" | "body"> | undefined,
  ) {
    return await this.request(endpoint, { ...options, method: "PUT", body });
  }

  public async delete<T>(
    endpoint: string,
    options?: Omit<RequestInit, "method"> | undefined,
  ) {
    return await this.request(endpoint, { ...options, method: "DELETE" });
  }
}

export default Api;
