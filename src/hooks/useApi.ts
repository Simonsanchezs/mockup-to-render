import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { ApiState } from '@/types/api';

// Hook genérico para manejar llamadas a la API
export function useApi<T>(
  endpoint: string,
  options: {
    immediate?: boolean;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
  } = {}
): ApiState<T> & {
  refetch: () => Promise<void>;
  execute: (data?: any) => Promise<T | null>;
} {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const { immediate = true, method = 'GET', body } = options;

  const execute = async (data?: any): Promise<T | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      let result: T;
      const requestData = data || body;

      switch (method) {
        case 'GET':
          result = await apiService.get<T>(endpoint);
          break;
        case 'POST':
          result = await apiService.post<T>(endpoint, requestData);
          break;
        case 'PUT':
          result = await apiService.put<T>(endpoint, requestData);
          break;
        case 'DELETE':
          result = await apiService.delete<T>(endpoint);
          break;
        default:
          throw new Error(`Método HTTP no soportado: ${method}`);
      }

      setState(prev => ({ ...prev, data: result, loading: false }));
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      return null;
    }
  };

  const refetch = async () => {
    await execute();
  };

  useEffect(() => {
    if (immediate && method === 'GET') {
      execute();
    }
  }, [endpoint, immediate, method]);

  return {
    ...state,
    refetch,
    execute,
  };
}

// Hook específico para obtener envíos
export function useShipments() {
  return useApi<any[]>('/shipments');
}

// Hook específico para obtener un envío por ID
export function useShipment(id: string) {
  return useApi<any>(`/shipments/${id}`, { immediate: !!id });
}

// Hook para crear un envío
export function useCreateShipment() {
  return useApi<any>('/shipments', { 
    immediate: false, 
    method: 'POST' 
  });
}

// Hook para actualizar un envío
export function useUpdateShipment(id: string) {
  return useApi<any>(`/shipments/${id}`, { 
    immediate: false, 
    method: 'PUT' 
  });
}

// Hook para actualizar estado de un envío
export function useUpdateShipmentStatus(id: string) {
  return useApi<any>(`/shipments/${id}/status`, { 
    immediate: false, 
    method: 'PUT' 
  });
}

// Hook para eliminar un envío
export function useDeleteShipment() {
  return useApi<any>('', { 
    immediate: false, 
    method: 'DELETE' 
  });
}

// Hook para autenticación
export function useLogin() {
  return useApi<any>('/auth/login', { 
    immediate: false, 
    method: 'POST' 
  });
}