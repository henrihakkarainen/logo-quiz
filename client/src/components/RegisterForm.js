import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const RegisterForm = (props) => {
  const [ username, setUsername ] = useState('');
  const [ usernameError, setUsernameError ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  const [ showPassword, setShowPassword ] = useState(false);
  const [ rePassword, setRePassword ] = useState('');
  const [ rePasswordError, setRePasswordError ] = useState('');
  const [ showRePassword, setShowRePassword ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('Error?');
  const [ t, i18n ] = useTranslation();

  const errorMessages = {
    username: {
      required: t('signup.usernameRequired'),
      short: t('signup.usernameShort')
    },
    email: {
      required: t('signup.emailRequired'),
      validity: t('signup.emailValidity')
    },
    password: {
      required: t('signup.passwordRequired'),
      match: t('signup.passwordsNoMatch'),
      short: t('signup.passwordShort')
    }
  };

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const verifyInput = () => {
    let verifyOk = true;

    if (!username) {
      verifyOk = false;
      setUsernameError(errorMessages.username.required);
    }
    if (username && username.length < 3) {
      verifyOk = false;
      setUsernameError(errorMessages.username.short);
    }
    if (!email) {
      verifyOk = false;
      setEmailError(errorMessages.email.required);
    }
    if (email && !email.match(emailRegex)) {
      verifyOk = false;
      setEmailError(errorMessages.email.validity);
    }
    if (!password) {
      verifyOk = false;
      setPasswordError(errorMessages.password.required);
    }
    if (!rePassword) {
      verifyOk = false;
      setRePasswordError(errorMessages.password.required);
    }
    if (password && password.length < 6) {
      verifyOk = false;
      setPasswordError(errorMessages.password.short);
    }
    if (password && password.length >= 6 && password !== rePassword) {
      verifyOk = false;
      setPasswordError(errorMessages.password.match);
    }
    if (rePassword && rePassword.length < 6) {
      verifyOk = false;
      setRePasswordError(errorMessages.password.short);
    }
    if (rePassword && rePassword.length >= 6 && password !== rePassword) {
      verifyOk = false;
      setRePasswordError(errorMessages.password.match);
    }
    return verifyOk;
  }

  const onSubmit = () => {
    const canSubmit = verifyInput();
    if (canSubmit) {
      console.log('sending')
    } else setError(true)
  }

  return (
    <Form>
      {error ? <Alert variant="danger">{errorMsg}</Alert> : ''}
      <TextField
        label={t('username')}
        style={{ marginBottom: 10 }}
        placeholder={t('signup.enterUsername')}
        error={usernameError ? true : false}
        fullWidth
        margin="normal"
        helperText={usernameError}
        InputLabelProps={{
          shrink: true, required: true
        }}
        variant="outlined"
        onChange={(e) => {
          if (e.target.value && usernameError) setUsernameError('')
          setUsername(e.target.value)
        }}
      />
      <TextField
        label={t('email')}
        style={{ marginBottom: 10 }}
        placeholder="user@email.com"
        error={emailError ? true : false}
        fullWidth
        margin="normal"
        helperText={emailError}
        InputLabelProps={{
          shrink: true, required: true
        }}
        variant="outlined"
        onChange={(e) => {
          if (e.target.value && emailError) setEmailError('')
          setEmail(e.target.value)
        }}
      />
      <TextField
        label={t('password')}
        type={showPassword ? 'text' : 'password'}
        style={{ marginBottom: 10 }}
        placeholder={t('signup.enterPassword')}
        error={passwordError ? true : false}
        fullWidth
        margin="normal"
        helperText={passwordError}
        InputLabelProps={{
          shrink: true, required: true
        }}
        variant="outlined"
        onChange={(e) => {
          if (e.target.value && passwordError) setPasswordError('')
          if (rePasswordError === errorMessages.password.match) setRePasswordError('')
          setPassword(e.target.value)
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
          ),
         }}
      />
      <TextField
        label={t('rePassword')}
        type={showRePassword ? 'text' : 'password'}
        style={{ marginBottom: 20 }}
        placeholder={t('signup.retypePassword')}
        error={rePasswordError ? true : false}
        fullWidth
        margin="normal"
        helperText={rePasswordError}
        InputLabelProps={{
          shrink: true, required: true
        }}
        variant="outlined"
        onChange={(e) => {
          if (e.target.value && rePasswordError) setRePasswordError('')
          if (passwordError === errorMessages.password.match) setPasswordError('')
          setRePassword(e.target.value)
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => setShowRePassword(!showRePassword)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {showRePassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
          ),
         }}
      />
      <Button block className="mb-3" onClick={onSubmit}>
        {t('signup.createAccount')}
      </Button>
      <Typography variant="body2">
        {t('signup.haveAccount')}
        &nbsp;
        <Link className="form-link" variant="body2" onClick={() => props.setMode('login')}>
          {t('signup.login')}
        </Link>
      </Typography>
    </Form>
  );
}

export default RegisterForm;