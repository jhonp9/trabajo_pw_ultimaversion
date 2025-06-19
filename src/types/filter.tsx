export interface FilterState {
  priceRange: [number, number];
  genre: string;
  platform: string;
  rating: number;
}

export interface FilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}