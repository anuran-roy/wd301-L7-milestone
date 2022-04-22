import { PaginationParams } from "../types/common";
import { formItemType } from "../types/formTypes";

export type RequestType = "GET"|"POST"|"PATCH"|"DELETE"|"PUT";

const API_BASE_URL: string = "https://tsapi.gigin.dev/api/";

export const request = async (endpoint: string, method: RequestType = "GET", data: any = {}) => {
    let url: string = "";
    let payload: string|null = null;
    if (method === "GET") {
        payload = data ? JSON.stringify(data): null
        const params: string = data ? `?${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}` : "";
        url = API_BASE_URL + endpoint + params;
    } else {
        payload = JSON.stringify(data);
        url = API_BASE_URL + endpoint;
    }
    
    // Basic auth
    // const auth = "Basic " + window.btoa("anuranroy02:7PtjhbM3TwkX2Zu");

    // Token Auth
    const token = localStorage.getItem("token");
    const auth = token ? "Token " + localStorage.getItem("token") : "";

    console.log(`Payload is:`);
    console.log(payload);
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-type": "application/json",
          Authorization: auth,
        },
        body: method === "POST" ? payload: null,
      });
    //   const data = await response.json();
    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        const errorJson = await response.json();
        throw Error(errorJson);
    }
  };

  export const createForm = (formItem: formItemType) => {
      console.log(formItem);
    return request('forms/', 'POST', formItem);
  }

  export const deleteFormAPI = (formId: number) => {
    return request(`forms/${formId}/`, 'DELETE', {});
  }

  export const editFormAPI = (formId: number) => {
    return request(`forms/${formId}/`, 'DELETE', {});
  }

  export const login = async (username: string, password: string) => {
    // console.log(username, password);
    return request('auth-token/', 'POST', {username, password});
    // return details;
  }

  export const me = async () => {
    return request('users/me/', 'GET', {});
  }

  export const listForms = (pageParams: PaginationParams) => {
      return request('forms/', 'GET', pageParams);
  }