// API Service para manejar todas las llamadas HTTP
export class ApiService {
  private baseURL: string;
  private headers: HeadersInit;

  constructor(baseURL: string = 'http://localhost:3000/api') {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  // Método privado para manejar respuestas
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error de conexión' }));
      throw new Error(error.message || `Error: ${response.status}`);
    }
    return response.json();
  }

  // Método privado para obtener headers con autenticación
  private getAuthHeaders(): HeadersInit {
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).token : null;
    
    return {
      ...this.headers,
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // GET request
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  // POST request
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  // PUT request
  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  // Método para establecer la URL base
  setBaseURL(url: string): void {
    this.baseURL = url;
  }

  // Método para establecer headers personalizados
  setHeaders(headers: HeadersInit): void {
    this.headers = { ...this.headers, ...headers };
  }
}

// Instancia singleton del servicio API
export const apiService = new ApiService();