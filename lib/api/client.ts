export interface ApiClientConfig {
  baseUrl: string
  timeout?: number
  retries?: number
  headers?: Record<string, string>
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly context?: unknown,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), ms)
  try {
    return await promise
  } finally {
    clearTimeout(id)
  }
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries: number,
  timeoutMs: number,
): Promise<Response> {
  let lastError: unknown

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await withTimeout(fetch(url, options), timeoutMs)
      // Do not retry client errors
      if (response.status >= 400 && response.status < 500) return response
      if (response.ok) return response

      lastError = new ApiError(response.status, `Request failed: ${response.statusText}`)
      if (attempt < retries) await sleep(Math.pow(2, attempt) * 200)
    } catch (err) {
      lastError = err
      if (attempt < retries) await sleep(Math.pow(2, attempt) * 200)
    }
  }

  throw lastError
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function createApiClient(config: ApiClientConfig) {
  const { baseUrl, timeout = 8000, retries = 3, headers: defaultHeaders = {} } = config

  async function request<T>(
    path: string,
    options: RequestInit & { authToken?: string } = {},
  ): Promise<T> {
    const { authToken, ...fetchOptions } = options
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(fetchOptions.headers as Record<string, string> | undefined),
    }

    const response = await fetchWithRetry(
      `${baseUrl}${path}`,
      { ...fetchOptions, headers },
      retries,
      timeout,
    )

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      throw new ApiError(response.status, body || response.statusText)
    }

    return response.json() as Promise<T>
  }

  return {
    get: <T>(path: string, options?: RequestInit) => request<T>(path, { ...options, method: 'GET' }),
    post: <T>(path: string, body: unknown, options?: RequestInit) =>
      request<T>(path, { ...options, method: 'POST', body: JSON.stringify(body) }),
  }
}

export const apiClient = createApiClient({
  baseUrl: '',
  timeout: 8000,
  retries: 3,
})
