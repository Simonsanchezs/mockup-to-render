// Configuración de endpoints de la API

export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://tu-api.com/api' 
  : 'http://localhost:3000/api';

// Endpoints de envíos
export const ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },

  // Envíos
  SHIPMENTS: {
    LIST: '/shipments',
    CREATE: '/shipments',
    GET_BY_ID: (id: string) => `/shipments/${id}`,
    UPDATE: (id: string) => `/shipments/${id}`,
    DELETE: (id: string) => `/shipments/${id}`,
    UPDATE_STATUS: (id: string) => `/shipments/${id}/status`,
    TRACKING: (id: string) => `/shipments/${id}/tracking`,
  },

  // Municipios
  MUNICIPALITIES: {
    LIST: '/municipalities',
    BY_DEPARTMENT: (department: string) => `/municipalities?department=${department}`,
  },

  // Usuarios
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    GET_BY_ID: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  // Dashboard/Reportes
  DASHBOARD: {
    STATS: '/dashboard/stats',
    RECENT_SHIPMENTS: '/dashboard/recent-shipments',
    ANALYTICS: '/dashboard/analytics',
  },
} as const;

// Headers por defecto
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Configuración de timeouts
export const API_CONFIG = {
  TIMEOUT: 30000, // 30 segundos
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 segundo
};

// Estados de envío disponibles
export const SHIPMENT_STATUSES = [
  'Pendiente',
  'En tránsito',
  'Entregado',
  'Novedad',
] as const;

// Prioridades disponibles
export const SHIPMENT_PRIORITIES = [
  'Alta',
  'Normal',
  'Baja',
] as const;

// Configuración de paginación
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
};