import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';

import LanguageSelection from './components/LanguageSelection';
import Navigation from './components/Navigation';
import Modal from './components/ModalForm';

import routes from './config/routeConfig';

import './App.css';
// import 'react-responsive-modal/styles.css';

const App = () => {
  const [ language, setLanguage ] = useState(localStorage.getItem('language'));
  const [ showLogin, setShowLogin ] = useState(false);
  const [ t, i18n ] = useTranslation();

  const onChangeLanguage = (lang) => {
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
    setLanguage(lang);
  }

  const onOpenLogin = () => setShowLogin(true);
  const onCloseLogin = () => setShowLogin(false);

  if (language === 'fi' || language === 'en') {
    return (
      <Router>
        <Container>
          <Navigation lang={language}
                      openLoginForm={onOpenLogin}
                      onChangeLanguage={onChangeLanguage}
                      router={Router.router} />
          <Switch>
            {routes.map(route => 
              <Route key={route.path} { ...route } />
            )}
          </Switch>

          <Modal show={showLogin} onHide={onCloseLogin} />
        </Container>
      </Router>
    )
  } else {
    return (
      <LanguageSelection onChangeLanguage={onChangeLanguage}/>
    );
  }
}

export default App;
