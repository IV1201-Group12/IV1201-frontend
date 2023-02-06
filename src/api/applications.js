import axios from 'axios';
import { apiConfig } from '../config/api-config';

export const applicationsApi = axios.create({
  baseURL: `${apiConfig.BACKEND_BASEURL}/applications`,
  withCredentials: true,
});

applicationsApi.defaults.headers.common['Content-Type'] = 'application/json';

export async function getAllApplications() {
  const { data } = await applicationsApi.get();
  return data;
}
