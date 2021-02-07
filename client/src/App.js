import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './App.css';
import LanguageSelection from './components/LanguageSelection';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Games from './components/Games';


const App = () => {
  const [ language, setLanguage ] = useState(localStorage.getItem('language'));
  const [ t, i18n ] = useTranslation();

  const onChangeLanguage = (e) => {
    localStorage.setItem('language', e.target.value);
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
  }

  if (language === 'fi' || language === 'en') {
    return (
      <Router>
        <div className="app">
          <Navigation lang={language} onChangeLanguage={onChangeLanguage} />
        </div>
        <Route path="/" exact component={Home} />
        <Route path="/games" component={Games} />
      </Router>
    )
  } else {
    return (
      <LanguageSelection onChangeLanguage={onChangeLanguage}/>
    );
  }
}

export default App;
