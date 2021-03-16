import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeModalMode } from '../store/actions/appActions';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Forgot = (props) => {
  const [ t ] = useTranslation();
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
          onClick={() => props.changeMode('login')}
        >
          {t('forgotPassword.back')}
        </Link>
      </Typography>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeMode: (mode) => dispatch(changeModalMode(mode))
  }
}

export default connect(null, mapDispatchToProps)(Forgot);