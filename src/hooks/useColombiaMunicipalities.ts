import { useState, useMemo } from 'react';
import colombiaData from '@/data/colombia-municipalities.json';

interface Municipality {
  name: string;
  department: string;
}

export const useColombiaMunicipalities = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const municipalities = useMemo(() => {
    const allMunicipalities: Municipality[] = [];
    
    colombiaData.forEach((department) => {
      department.ciudades.forEach((city) => {
        allMunicipalities.push({
          name: city,
          department: department.departamento,
        });
      });
    });

    return allMunicipalities.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredMunicipalities = useMemo(() => {
    if (!searchTerm) return municipalities;
    
    return municipalities.filter((municipality) =>
      municipality.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      municipality.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [municipalities, searchTerm]);

  return {
    municipalities,
    filteredMunicipalities,
    searchTerm,
    setSearchTerm,
  };
};