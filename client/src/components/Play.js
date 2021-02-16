import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import '../styles/Game.css';

const Loading = () => {
  return (
    <CircularProgress />
  );
}

const StartScreen = (props) => {
  const { t } = props;

  return (
    <div className="start-screen">
      <Typography variant="h4">
        {props.title}
      </Typography>
      <Typography>
        {props.description}
      </Typography>
      <Typography>
        {t('game.description')}
      </Typography>
      <Typography>
        {t('game.goodLuck')}
      </Typography>
      <Button variant="contained" color="primary">
        {t('game.start')}
      </Button>
    </div>
  );
}

const Error = () => {
  return (
    <div>
      Game not found
    </div>
  )
}

const Play = (props) => {

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  const [ t, i18n ] = useTranslation();
  const [ category, setCategory ] = useState(useQuery().get('category'))
  const [ game, setGame ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/categories?title=${category}`)
      .then(res => {
        setGame(res.data[0])
        setLoading(false)
      })
  }, [category])

  const renderGame = () => {

  }
  
  console.log(game)
  return (
    <div className="game">
      {
        loading ?
        <Loading /> :
        game ?
        <StartScreen
          title={game.title[i18n.language]}
          description={game.description[i18n.language]}
          t={t} /> :
        <Error />
      }
    </div>
  );
}

export default Play;