import { useState, useEffect } from 'react';
import './App.css';
import LanguageSelection from './components/LanguageSelection';


function App() {
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    const lang = localStorage.getItem('language');
    if(lang && language !== lang) {
      setLanguage(localStorage.getItem('language'))
    }
  }, [language])

  const onChangeLanguage = (e) => {
    localStorage.setItem('language', e.target.value);
    setLanguage(e.target.value)
  }

  return (
    <LanguageSelection onChangeLanguage={onChangeLanguage}/>
  );
}

export default App;
