import { axios } from './axios';

const ENDPOINT = '/things';

export async function getAllThings() {
  const { data } = await axios.get(ENDPOINT);
  console.log('dsadsadhsadas');
  return data;
}

export async function getThing(id) {
  const { data } = await axios.get(`${ENDPOINT}/${id}`);
  return data;
}
