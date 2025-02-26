import axios, { AxiosInstance, AxiosResponse } from "axios";
import { DogSearchParams, Dog, DogSearchResponse } from "../interfaces";

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      withCredentials: true,
    });
  }

  public async login(name: string, email: string): Promise<boolean> {
    try {
      const response = await this.axiosInstance.post("/auth/login", {
        name,
        email,
      });
      return response.status === 200;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  public async fetchDogsByCursor(cursor: string): Promise<DogSearchResponse> {
    try {
      const decodedCursor = decodeURIComponent(cursor);
      const response: AxiosResponse<DogSearchResponse> =
        await this.axiosInstance.get(decodedCursor);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      return { resultIds: [], total: 0, next: null, prev: null };
    }
  }

  public async fetchBreeds(): Promise<string[]> {
    try {
      const response: AxiosResponse<string[]> = await this.axiosInstance.get(
        "dogs/breeds"
      );
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      return [];
    }
  }

  public async searchDogs(params: DogSearchParams): Promise<DogSearchResponse> {
    try {
      const response: AxiosResponse<DogSearchResponse> =
        await this.axiosInstance.get("dogs/search", { params });
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      return { resultIds: [], total: 0, next: null, prev: null };
    }
  }

  public async fetchDogDetails(dogIds: string[]): Promise<Dog[]> {
    try {
      const response: AxiosResponse<Dog[]> = await this.axiosInstance.post(
        "/dogs",
        dogIds
      );
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      return [];
    }
  }

  public async fetchMatch(favorites: string[]): Promise<Dog | null> {
    try {
      const response: AxiosResponse<{ match: string }> =
        await this.axiosInstance.post("dogs/match", favorites);

      const matchedDogId = response.data.match;

      const dogDetails = await this.fetchDogDetails([matchedDogId]);
      return dogDetails[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error);
    } else {
      console.log(error);
    }
  }
}

export default new ApiService("https://frontend-take-home-service.fetch.com");
