import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-responsive-modal';

import './App.css';
import 'react-responsive-modal/styles.css';
import LanguageSelection from './components/LanguageSelection';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Games from './components/Games';
import Login from './components/Login';

const App = () => {
  const [ language, setLanguage ] = useState(localStorage.getItem('language'));
  const [ showLogin, setShowLogin ] = useState(false);
  const [ t, i18n ] = useTranslation();

  const onChangeLanguage = (e) => {
    localStorage.setItem('language', e.target.value);
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
  }

  const onOpenModal = () => setShowLogin(true);
  const onCloseModal = () => setShowLogin(false)

  if (language === 'fi' || language === 'en') {
    return (
      <Router>
        <div className="app">
          <Navigation lang={language}
                      toggle={onOpenModal}
                      onChangeLanguage={onChangeLanguage} />
        </div>
        <Route path="/" exact component={Home} />
        <Route path="/games" component={Games} />
        <Modal open={showLogin}
               onClose={onCloseModal}
               center>
          <Login />
        </Modal>
      </Router>
    )
  } else {
    return (
      <LanguageSelection onChangeLanguage={onChangeLanguage}/>
    );
  }
}

export default App;
