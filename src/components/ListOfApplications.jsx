import { useGetApplications } from '../queryHooks/useGetApplications';
import { useNavigate } from 'react-router-dom';

const ListOfApplications = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetApplications();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Applicants Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data
          ? data.map((application, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  {application.applicant.firstname}{' '}
                  {application.applicant.lastname}
                </td>
                <td>{application.status}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/applications/${application.applicant.id}`)
                    }
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default ListOfApplications;
