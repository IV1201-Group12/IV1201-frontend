import axios from 'axios';
import { apiConfig } from '../config/api-config';

const applicationsApi = axios.create({
  withCredentials: true,
  baseURL: `${apiConfig.BACKEND_BASEURL}/applications`,
});

const getApplicationApi = (id) => {
  return axios.create({
    withCredentials: true,
    baseURL: `${apiConfig.BACKEND_BASEURL}/applications/${id}`,
  });
};

applicationsApi.defaults.headers.common['Content-Type'] = 'application/json';

export async function getAllApplications() {
  const { data } = await applicationsApi.get();
  return data;
}

export async function getApplication(id) {
  const applicationApi = getApplicationApi(id);
  const { data } = await applicationApi.get();
  return data;
}

export async function updateStatusOfApplication(status, id, version) {
  const applicationApi = getApplicationApi(id);
  const response = await applicationApi.put('', { status, id, version });
  return response;
}
