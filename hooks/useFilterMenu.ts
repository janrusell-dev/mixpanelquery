import { fields } from "@/lib/fields";
import { useState } from "react";

// Controls filter property menu state and search behavior
export function useFilterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const [propertySearch, setPropertySearch] = useState("");
  const [hoveredProperty, setHoveredProperty] = useState<{
    name: string;
    label: string;
    description?: string;
  } | null>(null);

  // Filter fields based on search input
  const filteredProperties = fields.filter((f) =>
    f.label.toLowerCase().includes(propertySearch.toLowerCase()),
  );

  const resetSearch = () => {
    setPropertySearch("");
    setHoveredProperty(null);
  };

  return {
    isOpen,
    setIsOpen,
    propertySearch,
    setPropertySearch,
    hoveredProperty,
    setHoveredProperty,
    filteredProperties,
    resetSearch,
  };
}
