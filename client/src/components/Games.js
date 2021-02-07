import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Category from './Category';

import '../styles/Games.css';

const Games = (props) => {
  const [ t, i18n ] = useTranslation();
  const [ categoryList, setCategoryList ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/categories/published')
      .then((data) => {
        console.log(data)
        setCategoryList(data);
      })
  }, [])

  return (
    <div className="categories">
      <h1>{t('selectCategory')}</h1>
      <div>
        <Category />
      </div>
      <br />
      <p>{t('toBeAdded')}</p>
    </div>
  );
}

export default Games;