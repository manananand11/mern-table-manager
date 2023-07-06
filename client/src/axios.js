import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://table-manager-4f9c7c0e3cc3.herokuapp.com/menu",
});
