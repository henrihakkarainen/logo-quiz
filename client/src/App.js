import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './App.css';
import LanguageSelection from './components/LanguageSelection';
import Navigation from './components/Navigation';


const App = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language'));
  const [t, i18n] = useTranslation('common');

  useEffect(() => {
    const lang = localStorage.getItem('language');
    if(lang && language !== lang) {
      setLanguage(localStorage.getItem('language'))
    }
  }, [language])

  const onChangeLanguage = (e) => {
    localStorage.setItem('language', e.target.value);
    setLanguage(e.target.value);
    i18n.changeLanguage(language);
  }

  if (language === 'fi' || language === 'uk') {
    return (
      <Router>
        <div className="app">
        <Navigation lang={language} />
        </div>
      </Router>
    )
  } else {
    return (
      <LanguageSelection onChangeLanguage={onChangeLanguage}/>
    );
  }
}

export default App;
