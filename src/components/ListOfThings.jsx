import { useGetThings } from '../queryHooks/useGetThings';

const ListOfThings = () => {
  const { data, isLoading, isError, error } = useGetThings();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  return (
    <>
      {data.map((thing) => (
        <div key={thing.id}>
          {thing.id} {thing.text}
        </div>
      ))}
    </>
  );
};

export default ListOfThings;
