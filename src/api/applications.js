import axios from 'axios';
import { apiConfig } from '../config/api-config';

/**
 * The Axios instance used for querying the "/applications" endpoint.
 * Sets the XMLHttpRequest.withCredentials property to allow sending and receiving cookies in a cross-site context.
 */
const applicationsApi = axios.create({
  withCredentials: true,
  baseURL: `${apiConfig.BACKEND_BASEURL}/applications`,
});

applicationsApi.defaults.headers.common['Content-Type'] = 'application/json';

/**
 * Sends a GET request to the server, querying it for all the applications.
 * @returns All the applications as an array.
 */
export async function getAllApplications() {
  const { data } = await applicationsApi.get();
  return data;
}

/**
 * Sends a GET request to the server, querying it for an application with a given id.
 * @param {*} id The given id.
 * @returns The application matching the given id if it exists. Null otherwise.
 */
export async function getApplication(id) {
  const { data } = await applicationsApi.get(`/${id}`);
  return data;
}

export async function updateStatusOfApplication(status, id, version) {
  const response = await applicationsApi.put(`/${id}`, { status, id, version });
  return response;
}
