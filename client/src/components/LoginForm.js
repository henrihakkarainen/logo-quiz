import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeModalMode } from '../store/actions/appActions';
import { loginUser } from '../store/actions/userActions';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const LoginForm = (props) => {
  const [ t ] = useTranslation();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ rememberMe, setRememberMe ] = useState(false);
  const [ viewPassword, setViewPassword ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');

  useEffect(() => {
    if (props.modal.showError) {
      setErrorMsg(getErrorMsg(props.modal.errorCode))
    }
  }, [props.modal])

  const getErrorMsg = (code) => {
    switch (code) {
      case 400:
        return 'provide credentials'
      case 401:
        return 'invalid credentials'
      case 404:
        return 'not found'
      default:
        return 'error?'
    }
  }

  const togglePasswordVisibility = () => {
    setViewPassword(!viewPassword);
  }

  const onHandleLogin = () => {
    props.loginUser({
      username,
      password
    })
    
    // setError(true);
    // setErrorMsg('Error?')
    
  }

  return (
    <Form className="align-items-center">
      {props.modal.showError ? <Alert variant="danger">{errorMsg}</Alert> : ''}
      <Form.Group>
        <Form.Label>{t('username')}</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <PersonIcon />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            value={username}
            placeholder={t('login.enterUsername')}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>{t('password')}</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text
              className="form-password"
              onClick={togglePasswordVisibility}>
              <Tooltip title={viewPassword ? t('login.hidePassword') : t('login.viewPassword')}>
                {viewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </Tooltip>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type={viewPassword ? 'text' : 'password'}
            value={password}
            placeholder={t('login.enterPassword')}
            onChange={(e) => setPassword(e.target.value)} />
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Check
          type="checkbox"
          label={t('login.rememberMe')}
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)} />
      </Form.Group>

      <Button
        block
        className="mb-2"
        disabled={!username || !password}
        onClick={onHandleLogin}>
        {t('loginBtn')}
      </Button>
      <Grid container>
        <Grid item xs>
          <Typography variant="body2">
            <Link
              className="form-link"
              variant="body2"
              onClick={() => props.changeMode('forgot')}
            >
              {t('login.forgotPassword')}
            </Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            {t('login.noAccount')}
            <br />
            <Link
              className="form-link"
              variant="body2"
              onClick={() => props.changeMode('register')}
            >
              {t('login.signUp')}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    modal: {
      errorCode: state.appReducer.errorCode,
      showError: state.appReducer.showModalError
    },
    user: state.userReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (credentials) => dispatch(loginUser(credentials)),
    changeMode: (mode) => dispatch(changeModalMode(mode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);