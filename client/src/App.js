import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';

import './App.css';
import 'react-responsive-modal/styles.css';
import LanguageSelection from './components/LanguageSelection';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Games from './components/Games';
import Play from './components/Play';
import Modal from './components/ModalForm';

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
      <>
      <Router>
        <Container>
          <Navigation lang={language}
                      openLoginForm={onOpenLogin}
                      onChangeLanguage={onChangeLanguage}
                      router={Router.router} />
          <Route path="/" exact component={Home} />
          <Route path="/games" component={Games} />
          <Route path="/play" component={Play} />
        </Container>
      </Router>
      <Modal show={showLogin} onHide={onCloseLogin} />
      </>
    )
  } else {
    return (
      <LanguageSelection onChangeLanguage={onChangeLanguage}/>
    );
  }
}

export default App;
