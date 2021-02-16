import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import '../styles/ModalForm.css';

const Forgot = (props) => {
  const [ t, i18n ] = useTranslation();
  return (
    <div>
      <Typography>
        {t('forgotPassword.info')}
      </Typography>
      <br />
      <Typography variant="body2">
        <Link
          className="form-link"
          variant="body2"
          onClick={() => props.setMode('login')}
        >
          {t('forgotPassword.back')}
        </Link>
      </Typography>
    </div>
  );
}

const ModalForm = (props) => {
  const [ t, i18n ] = useTranslation();
  const [ mode, setMode ] = useState('login');

  const onChangeForm = (view) => {
    setMode(view);
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      centered
      backdrop="static"
      restoreFocus={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          { mode === 'login' ?
            t('loginBox') :
            mode === 'register'
            ? t('signup.title')
            : t('forgotPassword.title') }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { mode === 'login' ?
          <LoginForm setMode={onChangeForm} /> :
          mode === 'register' ?
          <RegisterForm setMode={onChangeForm} /> :
          <Forgot setMode={onChangeForm}/>
        }
      </Modal.Body>
    </Modal>
  );
}

export default ModalForm;