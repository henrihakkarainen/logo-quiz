import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import '../styles/ModalForm.css';

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
        <Modal.Title>{ mode === 'login' ? t('loginBox') : t('signup.title') }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { mode === 'login' ?
          <LoginForm setMode={onChangeForm} /> :
          <RegisterForm setMode={onChangeForm} />
        }
      </Modal.Body>
    </Modal>
  );
}

export default ModalForm;