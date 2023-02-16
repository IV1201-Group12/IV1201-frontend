import { useParams } from 'react-router-dom';

import { useGetApplication } from '../queryHooks/useGetApplication';

const Application = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetApplication(id);
};

export default Application;
