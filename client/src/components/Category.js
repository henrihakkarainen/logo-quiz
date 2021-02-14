import { useTranslation } from 'react-i18next';

const Category = (props) => {
  const [ t, i18n ] = useTranslation();

  return (
    <div className="category"
         onClick={() => console.log('start game')}
         style={{
           backgroundImage: `url(http://localhost:8080${props.bgUrl})`,
           cursor: 'pointer'
          }}>
      <h2>{props.title[i18n.language]}</h2>
    </div>
  )
}

export default Category;