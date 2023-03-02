/**
 * This module exports the axios functions used to send requests to the application endpoint
 * on the backend
 */

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

/**
 * Send a PUT request to the application endpoint on a specific id
 * with a new status to give it.
 * @param {*} status The new status of the application
 * @param {*} id The id of the application to update
 * @param {*} version The version of the application to update
 * @returns The newly modified application
 */
export async function updateStatusOfApplication(status, id, version) {
  const response = await applicationsApi.put(`/${id}`, { status, id, version });
  return response;
}
