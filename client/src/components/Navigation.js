import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import uk from '../images/icons/uk.png';
import fin from '../images/icons/fin.png';

import '../styles/Navigation.css';

const Navigation = (props) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>Logo Quiz</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" activeKey={location.pathname}>
          <LinkContainer exact to="/">
            <Button className="mr-1" variant="light">{t('home')}</Button>
          </LinkContainer>
          <LinkContainer exact to="/games">
            <Button className="mr-1" variant="light">{t('games')}</Button>
          </LinkContainer>
          <LinkContainer exact to="/highscores">
            <Button variant="light">{t('highscores')}</Button>
          </LinkContainer>
        </Nav>
        <Dropdown className="mr-2">
            <DropdownButton variant="light"
                            title={
                              <span>
                                {i18n.language === 'en' ? 'English' : 'Suomi'}
                                <img src={i18n.language === 'en' ? uk : fin}
                                     alt={i18n.language === 'en' ? 'UK' : 'FIN'} />
                              </span>
                            }>
              <Dropdown.Header>{t('selectLanguage')}</Dropdown.Header>
              <Dropdown.Divider />
                <Dropdown.Item active={i18n.language === 'en' ? true : false}
                               onClick={() => props.onChangeLanguage('en')}>
                  <span>{t('languages.en')}<img src={uk} alt="UK" /></span>
                </Dropdown.Item>
                <Dropdown.Item active={i18n.language === 'fi' ? true : false}
                               onClick={() => props.onChangeLanguage('fi')}>
                  <span>{t('languages.fi')}<img src={fin} alt="FIN" /></span>
                </Dropdown.Item>           
            </DropdownButton>
          </Dropdown>
        <Button variant="outline-dark" onClick={props.openLoginForm}>{t('login')}</Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;