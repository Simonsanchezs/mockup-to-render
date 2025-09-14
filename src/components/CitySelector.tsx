import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useColombiaMunicipalities } from "@/hooks/useColombiaMunicipalities";

interface CitySelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const CitySelector = ({ value, onValueChange, placeholder = "Seleccionar ciudad..." }: CitySelectorProps) => {
  const [open, setOpen] = useState(false);
  const { filteredMunicipalities, setSearchTerm } = useColombiaMunicipalities();

  const selectedCity = filteredMunicipalities.find((city) => city.name === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCity ? (
            <span>{selectedCity.name}, {selectedCity.department}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Buscar ciudad..."
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>No se encontraron ciudades.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-y-auto">
              {filteredMunicipalities.slice(0, 100).map((city) => (
                <CommandItem
                  key={`${city.name}-${city.department}`}
                  value={city.name}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === city.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{city.name}</span>
                    <span className="text-xs text-muted-foreground">{city.department}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};