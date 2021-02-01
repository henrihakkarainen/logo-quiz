// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import uk from '../images/icons/uk.png';
import fin from '../images/icons/fin.png';
import '../styles/Navigation.css';

const Navigation = (props) => {
  // const [ active, setActive ] = useState();
  const { t, i18n } = useTranslation();

  // console.log(t, i18n)

  return (
    <nav>
      <ul>
        <li><Link to="/">{t('home')}</Link></li>
        <li className="nav-right"><Link to="/login">{t('login')}</Link></li>
        <li className="nav-right">
          <div className="dropdown-selection">
            <button>
              <img className="icon" src={i18n.lang === 'fi' ? fin : uk} alt="Language"></img>
              {i18n.lang === 'fi' ? 'Suomi' : 'English'}
            </button>
            <div className="dropdown-content">
              <button>
                <img className="icon" src={uk} alt="UK"></img>
                {t('languages.en')}
              </button>
              <button onClick={() => i18n.changeLanguage('fi')}>
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