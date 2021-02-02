import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import uk from '../images/icons/uk.png';
import fin from '../images/icons/fin.png';
import '../styles/Navigation.css';

const Navigation = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <nav>
      <ul>
        <li><Link to="/">{t('home')}</Link></li>
        <li><Link to="/games">{t('games')}</Link></li>
        <li className="nav-right">
          <Link to="/login">{t('login')}</Link>
        </li>
        <li className="nav-right">
          <div className="dropdown-selection">
            <button>
              <img className="icon" src={i18n.language === 'fi' ? fin : uk} alt="Language"></img>
              {i18n.language === 'fi' ? 'Suomi' : 'English'}
            </button>
            <div className="dropdown-content">
              <button value="en" onClick={props.onChangeLanguage}>
                <img className="icon" src={uk} alt="UK"></img>
                {t('languages.en')}
              </button>
              <button value="fi" onClick={props.onChangeLanguage}>
                <img className="icon" src={fin} alt="FI"></img>
                {t('languages.fi')}
              </button>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;