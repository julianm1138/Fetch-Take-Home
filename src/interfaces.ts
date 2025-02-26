export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface DogSearchParams {
  breeds?: string[];
  zipcode?: string[] | null | undefined;
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  sort?: string;
  from?: string;
}

export interface DogSearchResponse {
  resultIds: string[];
  total: number;
  next: string | null;
  prev: string | null;
}

export interface FilterState {
  selectedBreed: string;
  ageMin: number | null;
  ageMax: number | null;
  sort: string;
  zipcode: string;
}

export interface FilterProps {
  onFilterChange: (filters: {
    breeds: string[];
    sort: string | null;
    ageRange: { min: number | null; max: number | null };
    zipcode: string[] | null;
  }) => void;
}

export interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface DogCardProps {
  dog: Dog;
  isFavorited: boolean;
  onToggleFavorite: (dogId: string) => void;
  showButton?: boolean;
}
