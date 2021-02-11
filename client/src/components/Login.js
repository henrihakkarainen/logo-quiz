import { useTranslation } from 'react-i18next';

import '../styles/Login.css';

const Login = (props) => {
  const [ t, i18n ] = useTranslation();

  return (
    <div className="login">
      <div>
        <h3>{t('loginBox')}</h3>
      </div>
    </div>
  );
}

export default Login;