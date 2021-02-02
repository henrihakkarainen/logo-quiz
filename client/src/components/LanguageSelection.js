import uk from '../images/icons/uk.png';
import fin from '../images/icons/fin.png';
import '../styles/LanguageSelection.css';

const LanguageSelection = (props) => {
  return (
    <div className="language-selection">
      <h1>Welcome to Logo Quiz</h1>
      <br />
      <h3>Please, select your language</h3>
      <ul>
        <li>
          <button className="language-button" value="en" onClick={props.onChangeLanguage}>
            <img className="icon" src={uk} alt="UK"></img>
            English
          </button>
        </li>
        <li>
          <button className="language-button" value="fi" onClick={props.onChangeLanguage}>
            <img className="icon" src={fin} alt="FI"></img>
            Suomi
          </button>
        </li>
      </ul>   
    </div>
  );
}

export default LanguageSelection;