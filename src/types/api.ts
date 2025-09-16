// Tipos TypeScript para las respuestas de la API

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Tipos para Shipments
export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  weight: string;
  priority: 'Alta' | 'Normal' | 'Baja';
  status: 'Pendiente' | 'En tránsito' | 'Entregado' | 'Novedad';
  createdAt: string;
  updatedAt: string;
  deliveryDate?: string;
  observation?: string;
}

export interface CreateShipmentRequest {
  origin: string;
  destination: string;
  weight: string;
  priority: 'Alta' | 'Normal' | 'Baja';
}

export interface UpdateShipmentRequest {
  origin?: string;
  destination?: string;
  weight?: string;
  priority?: 'Alta' | 'Normal' | 'Baja';
  status?: 'Pendiente' | 'En tránsito' | 'Entregado' | 'Novedad';
  observation?: string;
  deliveryConfirmed?: boolean;
}

export interface UpdateStatusRequest {
  status: 'Pendiente' | 'En tránsito' | 'Entregado' | 'Novedad';
  observation?: string;
  deliveryConfirmed?: boolean;
}

// Tipos para autenticación
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

// Tipos para municipios
export interface Municipality {
  id: string;
  name: string;
  department: string;
}

// Tipos genéricos para paginación
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Estado de carga para hooks
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}