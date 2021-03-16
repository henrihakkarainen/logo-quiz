import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Modal from 'react-bootstrap/Modal';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPassword from './ForgotPassword';

import '../styles/ModalForm.css';

const ModalForm = (props) => {
  const [ t ] = useTranslation();

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
          { props.mode === 'login' ?
            t('loginBox') :
            props.mode === 'register'
            ? t('signup.title')
            : t('forgotPassword.title') }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { props.mode === 'login' ?
          <LoginForm /> :
          props.mode === 'register' ?
          <RegisterForm /> :
          <ForgotPassword />
        }
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    mode: state.appReducer.modalMode
  }
}

export default connect(mapStateToProps, null)(ModalForm);