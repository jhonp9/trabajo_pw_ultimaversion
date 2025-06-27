export interface FilterState {
  priceRange: [number, number];
  genre: string;
  platform: string;
  rating: number;
  oferta: string;
}

export interface FilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}