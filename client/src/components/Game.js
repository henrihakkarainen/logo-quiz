import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Typography from '@material-ui/core/Typography';

import DoneIcon from '@material-ui/icons/Done';
import Remove2Icon from '@material-ui/icons/ExposureNeg2';
import RedoIcon from '@material-ui/icons/Redo';

import ProgressBar from './ProgressBar';

const StartScreen = (props) => {
  const { t, title, description, handleStart } = props;

  return (
    <div className="start-screen">
      <Typography variant="h4">
        {title}
      </Typography>
      <Typography>
        {description}
      </Typography>
      <Typography>
        {t('game.description')}
      </Typography>
      <Typography>
        {t('game.goodLuck')}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleStart}>
        {t('game.start')}
      </Button>
    </div>
  );
}

const Game = (props) => {
  const { game, questions } = props;
  const [ t, i18n ] = useTranslation();
  const [ playing, setPlaying ] = useState(false);
  const [ score, setScore ] = useState(0);
  const [ addedPoints, setAddedPoints ] = useState(0);
  const [ currentQuestion, setCurrentQuestion ] = useState(null);
  const [ round, setRound ] = useState(1);
  const [ timeLeft, setTimeLeft ] = useState(10000);
  const [ timeRunning, setTimeRunning ] = useState(false);
  const [ percent, setPercent ] = useState(1);
  const [ lifelinesUsed, setLifelinesUsed ] = useState({
    fiftyfifty: false,
    skip: false
  });

  const buttonClasses = {
    correct: 'correct-choice',
    wrong: 'wrong-choice'
  };

  
  useEffect(() => {
    // console.log(timeLeft)
    setPercent(calculatePercent());
  }, [ timeLeft ])
  

  useEffect(() => {
    const timer = setTimeout(() => {
      if (playing && timeRunning) setTimeLeft(calculateTimeLeft())
    }, 200)
    return () => clearTimeout(timer)   
  })

  const onHandleGameStart = () => {
    pickRandomQuestion(round);
    setScore(0);
    setLifelinesUsed({ fiftyfifty: false, skip: false });
    setTimeLeft(10000);
    setPlaying(true);
    setTimeRunning(true);
  }

  const onHandleGameEnd = () => {
    setPlaying(false);
    setRound(1);
  }

  const onChooseRight = (e) => {
    if (e.target.localName === 'span')
      e.target.parentElement.classList.add(buttonClasses.correct);
    else
      e.target.classList.add(buttonClasses.correct);

    const countPoints = calculatePositiveScore();
    setAddedPoints(countPoints)
    setTimeout(() => {
      e.target.classList.remove(buttonClasses.correct);
      e.target.parentElement.classList.remove(buttonClasses.correct);
      if (round !== 10) {
        pickRandomQuestion(round + 1);
        setScore(score + countPoints)
        setRound(round + 1);
        setTimeLeft(10000);
        setTimeRunning(true);
      } else {
        setScore(score + countPoints)
        onHandleGameEnd();
      }
    }, 1500)
    
  }

  const onChooseWrong = (e) => {
    if (e.target.localName === 'span')
      e.target.parentElement.classList.add(buttonClasses.wrong);
    else
      e.target.classList.add(buttonClasses.wrong);

    const countPoints = calculateNegativeScore();
    setAddedPoints(countPoints)
    setTimeout(() => {
      e.target.classList.remove(buttonClasses.wrong);
      e.target.parentElement.classList.remove(buttonClasses.wrong);
      setScore(score + addedPoints)
      onHandleGameEnd();
    }, 1500)
  }

  const onHandleSkip = () => {
    setAddedPoints(score < 500 ? -score : -500);
    setTimeout(() => {
      pickRandomQuestion(round + 1);
      setLifelinesUsed({ ...lifelinesUsed, skip: true });
      setScore(score < 500 ? 0 : score - 500);
      setRound(round + 1);
      setTimeLeft(10000);
      setTimeRunning(true);
    }, 750)
  }

  const onHandleRemoveTwo = () => {
    console.log('fiftyfifty')
    setLifelinesUsed({ ...lifelinesUsed, fiftyfifty: true });
  }

  const calculateTimeLeft = () => {
    return timeLeft !== 0 ? timeLeft - 200 : 0;
  }

  const calculatePercent = () => {
    return timeLeft / 10000;
  }

  // Minimum score for a correct answer is 100 points
  const calculatePositiveScore = () => {
    const score = Number.parseInt(timeLeft * (round / 3) / 5);
    return score < 100 ? 100 : score;
  }

  const calculateNegativeScore = () => {
    const minusScore = Number.parseInt(round * 95);
    return minusScore > score ? -score : -minusScore;
  }

  const pickRandomQuestion = (round) => {
    // Get possible questions for the current round
    const questionsByRound = _.filter(questions, (question) => 
      question.difficulty === round);

    // Randomly pick one question
    const pickOne = _.sample(questionsByRound);
    
    // Shuffle a list of 4 choices that are answer alternatives, one of them
    // is of course the correct choice (using spread syntax here)
    const choices = [
      ..._.shuffle(pickOne.options).slice(0, 3),
      pickOne.correct
    ];

    setCurrentQuestion({
      ...pickOne,
      choices: _.shuffle(choices)
    });
  }

  const renderGame = () => {
    return (
      <Container>
        <Row className="game-title">
          <Col>
            <Typography variant="h4">{game.title[i18n.language]}</Typography>
          </Col>
        </Row>
        <Row>
          <Col 
            className={`align-right font-sizing ${timeRunning || addedPoints === 0 ? 'add-score' : ''}`}
            style={{ color: `${addedPoints < 0 ? 'red' : 'green'}` }}
          >
            {`${addedPoints < 0 ? '-' : '+'} ${Math.abs(addedPoints)}`}
          </Col>
        </Row>
        <Row>
          <Col className="align-left font-sizing">Progress: {round} / 10</Col>
          <Col className="align-right font-sizing">Score: {score}</Col>
        </Row>
        <Row className="logo-and-questions">
          <Col sm={12} md={6}>
            <img className="game-logo" src={`http://localhost:8080${currentQuestion.imageURL}`} alt="logo" />
          </Col>
          <Col sm={12} md={6} style={{ margin: 'auto' }}>
            {
              currentQuestion.choices.map((option, i) => {
                return (
                  <Row className="question-row" key={i}>
                    <Button
                      className="q-button"
                      variant="outlined"
                      onClick={(e) => {
                        if (timeRunning) {
                          setTimeRunning(false);
                          option === currentQuestion.correct ? onChooseRight(e) : onChooseWrong(e)
                        }
                       }}
                    >
                        {option}
                    </Button>
                  </Row>
                );
              })
            }
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} className="align-left">
            <Row>
              <Button
                startIcon={<Remove2Icon />}
                variant="outlined"
                disabled={lifelinesUsed.fiftyfifty}
                onClick={() => {
                  if (timeRunning) {
                    onHandleRemoveTwo();
                  }
                }}
              >
                Poista 2
              </Button>
              <Button
                startIcon={<RedoIcon />}
                variant="outlined"
                disabled={lifelinesUsed.skip || round === 10}
                onClick={() => {
                  if (timeRunning) {
                    setTimeRunning(false);
                    onHandleSkip();
                  }
                }}
              >
                Skip
              </Button>
            </Row>
          </Col>
          <Col xs={12} sm={6} className="align-right end-game-btn">
            <Button startIcon={<DoneIcon />} variant="outlined">Jää tähän</Button>
          </Col>
        </Row>
        <Row style={{ margin: '20px -30px 0' }}>
          <Col sm={12}>
            <ProgressBar percent={percent}/>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div className="game">
      {
        playing ?
        renderGame() :
        <StartScreen
          title={game.title[i18n.language]}
          description={game.description[i18n.language]}
          handleStart={onHandleGameStart}
          t={t} />
      }
    </div>
  );
}

export default Game;