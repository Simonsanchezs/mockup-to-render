// Utilidades para manejo de APIs y conexiones

import { toast } from "@/hooks/use-toast";

// Función para manejar errores de API
export function handleApiError(error: unknown, customMessage?: string): string {
  let errorMessage = customMessage || 'Ha ocurrido un error inesperado';
  
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  // Mostrar toast de error automáticamente
  toast({
    variant: "destructive",
    title: "Error",
    description: errorMessage
  });

  return errorMessage;
}

// Función para validar conexión a internet
export function isOnline(): boolean {
  return navigator.onLine;
}

// Función para retry de llamadas API
export async function retryApiCall<T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: unknown;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
}

// Función para formatear datos antes de enviar a la API
export function formatShipmentData(formData: any) {
  return {
    ...formData,
    weight: formData.weight ? `${formData.weight} kg` : '',
    createdAt: new Date().toISOString(),
  };
}

// Función para validar datos de envío
export function validateShipmentData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.origin?.trim()) {
    errors.push('El origen es requerido');
  }

  if (!data.destination?.trim()) {
    errors.push('El destino es requerido');
  }

  if (!data.weight?.trim()) {
    errors.push('El peso es requerido');
  }

  if (!data.priority) {
    errors.push('La prioridad es requerida');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Función para manejar respuestas de API con éxito
export function handleApiSuccess(message: string, data?: any) {
  toast({
    title: "Éxito",
    description: message
  });
  
  return data;
}

// Cache simple para respuestas de API
class SimpleCache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private ttl = 5 * 60 * 1000; // 5 minutos

  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}

export const apiCache = new SimpleCache();

// Función para generar URLs de API
export function buildApiUrl(endpoint: string, params?: Record<string, any>): string {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://tu-api.com/api' 
    : 'http://localhost:3000/api';

  if (!params) {
    return `${baseUrl}${endpoint}`;
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return `${baseUrl}${endpoint}?${searchParams.toString()}`;
}

// Función para debounce (útil para búsquedas)
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}