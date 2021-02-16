import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Category from './Category';
import Typography from '@material-ui/core/Typography';

import '../styles/Games.css';

const Games = (props) => {
  const [ t, i18n ] = useTranslation();
  const [ categoryList, setCategoryList ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/categories/published')
      .then((res) => {
        console.log(res.data)
        setCategoryList(res.data);
      })
  }, [])

  return (
    <div className="categories">
      <Typography variant="h4">
        {t('selectCategory')}
      </Typography>
      {categoryList.map(item =>
        <Category key={item.id}
                  title={item.title}
                  description={item.description}
                  bgUrl={item.backgroundImageURL} />
      )}
      <br />
      <p>{t('toBeAdded')}</p>
    </div>
  );
}

export default Games;