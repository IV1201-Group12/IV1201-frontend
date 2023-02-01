import axios from 'axios';
import { apiConfig } from '../config/api-config';

const BASE_URL = `${apiConfig.BACKEND_BASEURL}/applications`;

export const applicationsApi = axios.create({
  baseURL: BASE_URL,
});

applicationsApi.defaults.headers.common['Content-Type'] = 'application/json';

export async function getAllApplications() {
  const { data } = await applicationsApi.get();
  return data;
}
