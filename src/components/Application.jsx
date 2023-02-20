import { useParams } from 'react-router-dom';

import { useGetApplication } from '../queryHooks/useGetApplication';
import { useUpdateStatus } from '../queryHooks/useUpdateStatus';

const Application = () => {
  const { id } = useParams();
  const getApplication = useGetApplication(id);
  const updateStatus = useUpdateStatus();

  if (getApplication.isLoading) return <h1>Loading...</h1>;

  if (getApplication.isError) {
    return <h1>{getApplication.error.message}</h1>;
  }

  if (getApplication.data) {
    setTimeout(() => {
      const status = document.getElementById(`${getApplication.data.status}`);
      status.selected = 'selected';
    }, 400);

    const handleSave = () => {
      const statusSelected = document.getElementById('status').value;
      const version = getApplication.data.version;
      try {
        updateStatus.mutate({ statusSelected, id, version });
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <>
        <h1>First name: {getApplication.data?.applicant?.firstname}</h1>
        <h1>Last name: {getApplication.data?.applicant?.lastname}</h1>
        <h1>Email: {getApplication.data?.applicant?.email}</h1>
        <h1>Person number: {getApplication.data?.applicant?.pnr}</h1>
        {getApplication.data?.competences.map((competence, index) => {
          return (
            <div key={index}>
              <h1>Competence: {competence?.name}</h1>
              <h1>Years of experience: {competence?.years_of_experience}</h1>
            </div>
          );
        })}
        {getApplication.data?.availabilities.map((availability, index) => {
          return (
            <div key={index}>
              <h1>Available from: {availability?.from_date}</h1>
              <h1>Available to: {availability?.to_date}</h1>
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
        {updateStatus.isLoading ? <h1>Loading...</h1> : null}
        {updateStatus.isError ? <h1>{updateStatus.error.message}</h1> : null}
      </>
    );
  }
};

export default Application;
