import axios, { AxiosRequestConfig } from "axios";

export interface DataResponse<T> {
  page: number;
  total_page: number;
  total_results: number;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDYwMDJkNDQxYzY0NzM5ZmE1ZWRjZmNmZDljOWRhMSIsInN1YiI6IjYzNzI4MDVlMmIxYjQ0MDBjZTQ4NDEzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.opqpsiIf8O45rSHBPRV_KZ3np56XlxxeT5Cy53qC8iU",
  },
});

class APIClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<DataResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
  get = async (id: number | string) => {
    return axiosInstance
      .get<DataResponse<T>>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };
}

export default APIClient;
