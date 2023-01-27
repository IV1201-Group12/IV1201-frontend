import { useGetApplications } from '../queryHooks/useGetApplications';

const ListOfApplications = () => {
  const { data, isLoading, isError, error } = useGetApplications();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  return (
    <>
      {data.map((application, i) => (
        <div key={application.id}>
          {i + 1} {application.applicant_name} {application.status}
        </div>
      ))}
    </>
  );
};

export default ListOfApplications;
