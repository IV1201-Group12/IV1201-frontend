import axios from 'axios';
import { apiConfig } from '../config/api-config';

const applicationsApi = axios.create({
  withCredentials: true,
  baseURL: `${apiConfig.BACKEND_BASEURL}/applications`,
});

applicationsApi.defaults.headers.common['Content-Type'] = 'application/json';

export async function getAllApplications() {
  const { data } = await applicationsApi.get();
  return data;
}

export async function getApplication(id) {
  const { data } = await applicationsApi.get(`/${id}`);
  return data;
}

export async function updateStatusOfApplication(status, id, version) {
  const response = await applicationsApi.put(`/${id}`, { status, id, version });
  return response;
}
