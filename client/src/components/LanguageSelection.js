import uk from '../images/icons/uk.png';
import fin from '../images/icons/fin.png';

export default function LanguageSelection(props) {
  return (
    <div className="language-selection">
      <h3>Select language</h3>
      <ul>
        <li>
          <button className="language-button" value="uk" onClick={props.onChangeLanguage}>
            <img className="icon" src={uk} alt="UK"></img>
            English
          </button>
        </li>
        <li>
          <button className="language-button" value="fin" onClick={props.onChangeLanguage}>
            <img className="icon" src={fin} alt="FIN"></img>
            Suomi
          </button>
        </li>
      </ul>   
    </div>
  );
}