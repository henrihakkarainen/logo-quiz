import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';

import '../styles/Game.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Loading = () => {
  return (
    <CircularProgress />
  );
}

const Play = (props) => {
  const [ category, setCategory ] = useState(useQuery().get('category'))
  const [ game, setGame ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  console.log(game)

  useEffect(() => {
    axios.get(`http://localhost:8080/api/categories?title=${category}`)
      .then(res => setGame(res.data))
      .then(setLoading(false))
  }, [category])

  return (
    <div className="game">
      <Loading />
    </div>
  );
}

export default Play;