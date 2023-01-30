import { axios } from './axios';

const ENDPOINT = '/createAccount';

export async function createNewAccount(applicant) {
  const response = await axios.post(ENDPOINT, applicant);
  return response;
}
