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

export interface Coordinates {
  lat: number;
  long: number;
}

export interface Location {
  city: string;
  state: string;
  zip_code: string;
}

export interface GeoBoundingBox {
  top?: Coordinates;
  bottom?: Coordinates;
  left?: Coordinates;
  right?: Coordinates;
  bottom_left?: Coordinates;
  bottom_right?: Coordinates;
  top_left?: Coordinates;
  top_right?: Coordinates;
}

export interface SearchLocationParams {
  city?: string;
  states?: string[];
  geoBoundingBox?: GeoBoundingBox;
  size?: number;
  from?: number;
}
