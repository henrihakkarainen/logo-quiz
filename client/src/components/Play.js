import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import Game from './Game';

import '../styles/Game.css';

const Loading = () => {
  return (
    <div>
      <CircularProgress />
      <br />
      <Typography variant="body1">
        Loading game, please wait...
      </Typography>
    </div>    
  );
}

const Error = (props) => {
  return (
    <div>
      Game "{props.title.toUpperCase()}" was not found
    </div>
  );
}

const Play = (props) => {
  
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  const [ t, i18n ] = useTranslation();
  const [ category, setCategory ] = useState(useQuery().get('category'))
  const [ game, setGame ] = useState(null);
  const [ gameData, setGameData ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/categories?title=${category}`)
      .then(res => {
        setGame(res.data[0])
      })
  }, [category])

  useEffect(() => {
    if (game) {
      axios.get(`http://localhost:8080/api/questions?category=${game.title?.en}`)
        .then(res => {
          setGameData(res.data)
          setLoading(false)
        })
    } else if (game !== null) {
      setLoading(false);
    }
  }, [game])
  
  return (
    <div className="game-container">
      {
        loading ?
        <Loading /> :
        game && Array.isArray(gameData) && gameData.length !== 0 ?
        <Game game={game} questions={gameData} /> :
        <Error title={category} />
      }
    </div>
  );
}

export default Play;