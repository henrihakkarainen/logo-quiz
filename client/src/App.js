import { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { closeModal } from './store/actions/appActions';

import Container from 'react-bootstrap/Container';

import LanguageSelection from './components/LanguageSelection';
import Navigation from './components/Navigation';
import Modal from './components/ModalForm';

import routes from './config/routeConfig';

import './App.css';

const App = (props) => {
  const [ language, setLanguage ] = useState(localStorage.getItem('language'));
  const [ t, i18n ] = useTranslation();

  const onChangeLanguage = (lang) => {
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
    setLanguage(lang);
  }

  if (language === 'fi' || language === 'en') {
    return (
      <Router>
        <Container>
          <Navigation lang={language}
                      onChangeLanguage={onChangeLanguage}
                      router={Router.router} />
          <Switch>
            {routes.map(route => 
              <Route key={route.path} { ...route } />
            )}
          </Switch>

          <Modal
            show={props.modal.open}
            onHide={() => props.closeModal()}
          />
        </Container>
      </Router>
    )
  } else {
    return (
      <LanguageSelection onChangeLanguage={onChangeLanguage}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: {
      open: state.appReducer.showModal
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
