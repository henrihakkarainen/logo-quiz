import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from '../config/axiosConfig';
import Category from './Category';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import '../styles/Games.css';

const Games = (props) => {
  const [ t ] = useTranslation();
  const [ categoryList, setCategoryList ] = useState([]);

  useEffect(() => {
    axios.get('/categories/published')
      .then((res) => {
        setCategoryList(res.data);
      })
  }, [])

  return (
    <div className="categories">
      <Typography variant="h4">
        {t('games')}
      </Typography>
      <Grid container spacing={2}>
        {categoryList.map(item =>
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Category
              title={item.title}
              description={item.description}
              alias={item.alias}
              bgUrl={item.backgroundImageURL}
            />
          </Grid>          
        )}
      </Grid>      
      <br />
      <p>{t('toBeAdded')}</p>
    </div>
  );
}

export default Games;