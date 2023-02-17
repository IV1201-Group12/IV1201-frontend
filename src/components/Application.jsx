import { useParams } from 'react-router-dom';

import { useGetApplication } from '../queryHooks/useGetApplication';
import { useUpdateStatus } from '../queryHooks/useUpdateStatus';
import { useNavigate } from 'react-router-dom';

const Application = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetApplication(id);
  const { mutate } = useUpdateStatus();

  if (isLoading) return <h1>Loading...</h1>;

  if (data) {
    setTimeout(() => {
      const status = document.getElementById(`${data.status}`);
      status.selected = 'selected';
    }, 100);
  }

  const handleSave = () => {
    const statusSelected = document.getElementById('status').value;
    mutate({ statusSelected, id });
    setTimeout(() => {
      navigate('/applications');
    }, 500);
  };

  return (
    <>
      <h1>First name: {data.user.firstname}</h1>
      <h1>Last name: {data.user.lastname}</h1>
      <h1>Email: {data.user.email}</h1>
      <h1>Person number: {data.user.pnr}</h1>
      {data.competences.map((competence, index) => {
        return (
          <div key={index}>
            <h1>Competence: {competence.name}</h1>
            <h1>Years of experience: {competence.years_of_experience}</h1>
          </div>
        );
      })}
      {data.availabilities.map((availability, index) => {
        return (
          <div key={index}>
            <h1>Available from: {availability.from_date}</h1>
            <h1>Available to: {availability.to_date}</h1>
          </div>
        );
      })}
      <select id="status">
        <option id="accepted" value="accepted">
          Accepted
        </option>
        <option id="rejected" value="rejected">
          Rejected
        </option>
        <option id="unhandled" value="unhandled">
          Unhandled
        </option>
      </select>{' '}
      <button id="save" onClick={handleSave}>
        Save
      </button>
    </>
  );
};

export default Application;
