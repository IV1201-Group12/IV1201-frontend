import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useGetApplication } from '../queryHooks/useGetApplication';
import { useUpdateStatus } from '../queryHooks/useUpdateStatus';

const Application = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { id } = useParams();
  const getApplication = useGetApplication(id);
  const updateStatus = useUpdateStatus();

  if (getApplication.isLoading) return <h1>{t('Loading')}</h1>;

  if (updateStatus.isSuccess) {
    setTimeout(() => {
      navigate('/applications');
    }, 500);
  }

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
        <h1>
          {t('Application.FirstName')}{' '}
          {getApplication.data?.applicant?.firstname}
        </h1>
        <h1>
          {t('Application.LastName')} {getApplication.data?.applicant?.lastname}
        </h1>
        <h1>
          {t('Application.Email')} {getApplication.data?.applicant?.email}
        </h1>
        <h1>
          {t('Application.Pnr')} {getApplication.data?.applicant?.pnr}
        </h1>
        {getApplication.data?.competences.map((competence, index) => {
          return (
            <div className="subContainer" key={index}>
              <h1>
                {t('Application.Competence')}{' '}
                {competence?.name === 'roller coaster operation'
                  ? t('Application.RollerCoaster')
                  : competence?.name === 'ticket sales'
                  ? t('Application.Tickets')
                  : t('Application.Lotteries')}
              </h1>
              <h1>
                {t('Application.Experience')} {competence?.years_of_experience}
              </h1>
            </div>
          );
        })}
        {getApplication.data?.availabilities.map((availability, index) => {
          return (
            <div className="subContainer" key={index}>
              <h1>
                {t('Application.AvailableFrom')} {availability?.from_date}
              </h1>
              <h1>
                {t('Application.AvailableTo')} {availability?.to_date}
              </h1>
            </div>
          );
        })}
        <select id="status">
          <option id="accepted" value="accepted">
            {t('Application.Accepted')}
          </option>
          <option id="rejected" value="rejected">
            {t('Application.Rejected')}
          </option>
          <option id="unhandled" value="unhandled">
            {t('Application.Unhandled')}
          </option>
        </select>{' '}
        <button id="save" onClick={handleSave}>
          {t('Application.Save')}
        </button>
        {updateStatus.isLoading ? <h1>{t('Loading')}</h1> : null}
        {updateStatus.isError ? <h1>{updateStatus.error.message}</h1> : null}
      </>
    );
  }
};

export default Application;
