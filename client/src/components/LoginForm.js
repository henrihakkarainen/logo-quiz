import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import '../styles/Login.css';

const LoginForm = (props) => {
  const [ t, i18n ] = useTranslation();
  const [ mode, setMode ] = useState('login');
  const [ viewPassword, setViewPassword ] = useState(false);

  const togglePasswordVisibility = () => {
    setViewPassword(!viewPassword);
  }

  const renderRegister = () => {
    return (
      <div>register</div>
    );
  }

  const renderLogin = () => {
    return (
      <Form className="align-items-center">
        <Form.Group>
          <Form.Label>{t('username')}</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <PersonIcon />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="text" placeholder={t('login.enterUsername')} />
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.Label>{t('password')}</Form.Label>
          <InputGroup>
          <InputGroup.Prepend>
              <InputGroup.Text className="form-password"
                               onClick={togglePasswordVisibility}>
                <Tooltip title={viewPassword ? t('login.hidePassword') : t('login.viewPassword')}>
                  {viewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </Tooltip>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type={viewPassword ? 'text' : 'password'}
                          placeholder={t('login.enterPassword')} />
          </InputGroup>
        </Form.Group>

        <Button block className="mb-2">
          {t('loginBtn')}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link className="form-link" variant="body2">{t('login.forgotPassword')}</Link>
          </Grid>
          <Grid item>
            <Typography variant="body2">{t('login.noAccount')}</Typography>
            <Link className="form-link" variant="body2">{t('login.signUp')}</Link>
          </Grid>
        </Grid>
      </Form>
    );
  }

  return (
    <Modal
      centered
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>{ mode === 'login' ? t('loginBox') : 'Register' }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { mode === 'login' ? renderLogin() : renderRegister() }
      </Modal.Body>
    </Modal>
  );
}

export default LoginForm;