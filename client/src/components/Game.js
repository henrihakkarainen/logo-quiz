import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Typography from '@material-ui/core/Typography';

import DoneIcon from '@material-ui/icons/CheckCircleOutline';
import Remove2Icon from '@material-ui/icons/ExposureNeg2';
import RedoIcon from '@material-ui/icons/Redo';

import ProgressBar from './ProgressBar';
import Recap from './Recap';

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
  const TIME = 10000;

  const [ t, i18n ] = useTranslation();
  const [ initialLoad, setInitialLoad ] = useState(true);
  const [ playing, setPlaying ] = useState(false);
  const [ score, setScore ] = useState(0);
  const [ addedPoints, setAddedPoints ] = useState(0);
  const [ currentQuestion, setCurrentQuestion ] = useState(null);
  const [ round, setRound ] = useState(1);
  const [ timeLeft, setTimeLeft ] = useState(TIME);
  const [ timeRunning, setTimeRunning ] = useState(false);
  const [ percent, setPercent ] = useState(1);
  const [ lifelinesUsed, setLifelinesUsed ] = useState({
    fiftyfifty: false,
    skip: false
  });
  const [ endReason, setEndReason ] = useState({
    wrongAnswer: false,
    finish: false,
    timeout: false,
    userQuit: false
  });
  const [ hide, setHide ] = useState(false);
  const [ showCorrect, setShowCorrect ] = useState(false);

  const buttonClasses = {
    correct: 'correct-choice',
    wrong: 'wrong-choice'
  };

  /*
    Playing around here a little because timer progress bar has 0.4 sec transition
    and if user clicks an answer just before timer seems to run out the actual timeLeft
    value is already 0 and game is over and may confuse the user who is like:
    "I'm sure there was some time left!?"
  */
  useEffect(() => {
    const calculateTimeLeft = () => {
      return timeLeft > -400 ? timeLeft - 200 : 0;
    }
  
    const calculatePercent = () => {
      return (timeLeft < 0 ? 0 : timeLeft) / TIME;
    }

    setPercent(calculatePercent());    
    const timer = setTimeout(() => {
      if (playing && timeRunning) setTimeLeft(calculateTimeLeft());
    }, 200)
    return () => clearTimeout(timer);

  }, [playing, timeRunning, timeLeft])

  useEffect(() => {
    if (timeLeft < -200 && timeRunning) {
      setAddedPoints(0);
      setTimeRunning(false);
      setEndReason({ ...endReason, timeout: true });
      setShowCorrect(true);
      setTimeout(() => {
        onHandleGameEnd()
      }, 2000)
    }
  }, [timeLeft, endReason, timeRunning])

  const onHandleGameStart = () => {
    setRound(1);
    pickRandomQuestion(1);
    setScore(0);
    setLifelinesUsed({ fiftyfifty: false, skip: false });
    setShowCorrect(false);
    setTimeLeft(TIME);
    setPlaying(true);
    setTimeRunning(true);
    setEndReason({ wrongAnswer: false, finish: false, timeout: false, userQuit: false })
    setInitialLoad(false);
  }

  const onHandleGameEnd = () => {
    setHide(false);
    setPlaying(false);
    
  }

  const onChooseRight = () => {
    setShowCorrect(true)
    const countPoints = calculatePositiveScore();
    setAddedPoints(countPoints)
    setTimeout(() => {
      setShowCorrect(false)
      if (round !== 10) {
        setHide(false);
        pickRandomQuestion(round + 1);
        setScore(score + countPoints)
        setRound(round + 1);
        setTimeLeft(TIME);
        setTimeRunning(true);
      } else {
        setScore(score + countPoints)
        setEndReason({ ...endReason, finish: true })
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
    setShowCorrect(true);
    setEndReason({ ...endReason, wrongAnswer: true })
    setTimeout(() => {
      e.target.classList.remove(buttonClasses.wrong);
      e.target.parentElement.classList.remove(buttonClasses.wrong);
      setScore(score + countPoints)
      onHandleGameEnd();
    }, 1500)
  }

  const onHandleSkip = () => {
    setAddedPoints(score < 500 ? -score : -500);
    setShowCorrect(true);
    setTimeout(() => {
      pickRandomQuestion(round + 1);
      setLifelinesUsed({ ...lifelinesUsed, skip: true });
      setScore(score < 500 ? 0 : score - 500);
      setRound(round + 1);
      setShowCorrect(false);
      setTimeLeft(TIME);
      setTimeRunning(true);
    }, 1500)
  }

  const onHandleRemoveTwo = () => {
    setHide(true);
    setLifelinesUsed({ ...lifelinesUsed, fiftyfifty: true });
  }

  const onHandleUserQuit = () => {
    setEndReason({ ...endReason, userQuit: true });
    setShowCorrect(true);
    setTimeout(() => {
      onHandleGameEnd();
    }, 1500)    
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

    const shuffled = _.shuffle(pickOne.options).slice(0, 3);
    
    // Shuffle a list of 4 choices that are answer alternatives, one of them
    // is of course the correct choice (using spread syntax here)
    const choices = [
      ...shuffled,
      pickOne.correct
    ];

    // Determine which questions will get removed when fifty-fifty is used
    const hideTwo = shuffled.slice(0, 2);

    setCurrentQuestion({
      ...pickOne,
      choices: _.shuffle(choices),
      hide: hideTwo
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
            {`${addedPoints < 0 ? '-' : '+'} ${Math.abs(addedPoints)} ${t('game.points')}`}
          </Col>
        </Row>
        <Row>
          <Col className="align-left font-sizing">{t('game.progress')}: {round} / 10</Col>
          <Col className="align-right font-sizing">{t('game.score')}: {score}</Col>
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
                      style={{
                        visibility: `${hide && currentQuestion.hide.includes(option) ? 'hidden' : 'visible'}`,
                        backgroundColor: `${option === currentQuestion.correct && showCorrect ? 'rgb(0, 158, 0)' : 'rgba(65, 60, 60, 0.6)'}`
                      }}
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
            <Row style={{ margin: 0 }}>
              <Button
                className="lifeline-btn"
                startIcon={<Remove2Icon />}
                variant="outlined"
                disabled={lifelinesUsed.fiftyfifty}
                onClick={() => {
                  if (timeRunning) {
                    onHandleRemoveTwo();
                  }
                }}
              >
                {t('game.removeTwo')}
              </Button>
              <Button
                className="lifeline-btn"
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
                {t('game.skip')}
              </Button>
            </Row>
          </Col>
          <Col xs={12} sm={6} className="align-right end-game-btn">
            <Button
              className="lifeline-btn"
              startIcon={<DoneIcon />}
              variant="outlined"
              disabled={score <= 0}
              onClick={() => {
                if (timeRunning) {
                  setAddedPoints(0)
                  setTimeRunning(false);
                  onHandleUserQuit();
                }
              }}
            >
              {t('game.endHere')}
            </Button>
          </Col>
        </Row>
        <Row style={{ margin: '20px -30px 0' }}>
          <Col sm={12}>
            <ProgressBar percent={percent}/>
          </Col>
        </Row>
        <Typography
          style={{
            display: `${endReason.timeout ? 'block' : 'none'}`
          }}
        >
          Aika loppui
        </Typography>
      </Container>
    );
  }

  return (
    <div className="game">
      {
        playing ?
        renderGame() :
        initialLoad ?
        <StartScreen
          title={game.title[i18n.language]}
          description={game.description[i18n.language]}
          handleStart={onHandleGameStart}
          t={t} /> :
        <Recap
          round={round}
          score={score}
          handleStart={onHandleGameStart}
          endReason={endReason}
        />
      }
    </div>
  );
}

export default Game;