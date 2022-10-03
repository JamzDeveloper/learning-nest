import axios from "axios";

export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
}

export class PokeApiAdapter implements HttpAdapter {
  private readonly axios = axios;
  async get(url: string) {
    const { data } = await this.axios.get(url);

    return data;
  }

  async post(url: string, data: any) {}
  async patch(url: string, data: any) {}
  async delete(url: string, data: any) {}
}

export class PokeApiFetchAdapter implements HttpAdapter {
  private readonly axios = axios;
  async get<T>(url: string): Promise<T> {
    const resp = await fetch(url);
    const data: T = await resp.json();
    return data;
  }

  async post(url: string, data: any) {}
  async patch(url: string, data: any) {}
  async delete(url: string, data: any) {}
}
