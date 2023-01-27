import { axios } from './axios';

const ENDPOINT = '/applications';

export async function getAllApplications() {
  const { data } = await axios.get(ENDPOINT);
  return data;
}
