import { useGetApplications } from '../queryHooks/useGetApplications';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ListOfApplications = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetApplications();

  if (isLoading) {
    return <h1>{t('Loading')}</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>{t('ListOfApplications.ApplicantsName')}</th>
          <th>{t('ListOfApplications.Status')}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((application) => (
          <tr key={application.id}>
            <td>{application.id}</td>
            <td>
              {application?.applicant?.firstname}{' '}
              {application?.applicant?.lastname}
            </td>
            <td>
              {application?.status === 'unhandled'
                ? t('Application.Unhandled')
                : application?.status === 'accepted'
                ? t('Application.Accepted')
                : t('Application.Rejected')}
            </td>
            <td>
              <button
                onClick={() => navigate(`/applications/${application.id}`)}
              >
                {t('ListOfApplications.ViewDetails')}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListOfApplications;
