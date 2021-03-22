import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { closeModal } from './store/actions/appActions';
import { autoLogin, setAccessToken } from './store/actions/userActions';

import Container from 'react-bootstrap/Container';

import LanguageSelection from './components/LanguageSelection';
import Navigation from './components/Navigation';
import Modal from './components/ModalForm';

import axios from './config/axiosConfig';
import routes from './config/routeConfig';

import './App.css';

const App = (props) => {
  const { setAccessToken, setLoggedInUser } = props;
  const [ language, setLanguage ] = useState(localStorage.getItem('language'));
  const [ t, i18n ] = useTranslation();
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('refreshToken');
      if (token) {
        setLoading(true);
        try {
          const res = await axios.post('/auth/refresh', {
            refreshToken: token
          });
          if (res.data?.accessToken) {
            setAccessToken(res.data.accessToken);
            setLoggedInUser({
              id: res.data.user._id,
              token: res.data.accessToken
            });
          }
          setLoading(false);
        } catch (err) {
          console.log(err)
          localStorage.removeItem('refreshToken');
          setLoading(false);
        }
      }
    })();
  }, [setAccessToken, setLoggedInUser])

  useEffect(() => {
    console.log(!loading ? 'user logged in' : 'not logged in')
  }, [loading])

  const onChangeLanguage = (lang) => {
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
    setLanguage(lang);
  }

  if (language === 'fi' || language === 'en') {
    return (
      <>
      { loading ?
        <p>Loading</p> :
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
      }
      </>
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
    },
    loggedIn: state.userReducer.loggedIn,
    accessToken: state.userReducer.accessToken,
    user: state.userReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    setLoggedInUser: (payload) => dispatch(autoLogin(payload)),
    setAccessToken: (token) => dispatch(setAccessToken(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
