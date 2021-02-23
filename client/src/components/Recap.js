import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const Recap = (props) => {
  const { score, round, handleStart, endReason } = props;

  const [ t, i18n ] = useTranslation();
  const [ loading, setLoading ] = useState(true)

  const tableColumns = [
    { id: 'rank', label: 'Rank', minWidth: 40, maxWidth: 40, align: 'right' },
    { id: 'user', label: 'User', minWidth: 100 },
    {
      id: 'score',
      label: 'Score',
      minwidth: 100,
      align: 'right'
    }
  ]

  useEffect(() => {
    console.log('Haetaan highscoret...')
    setLoading(false)
  }, [])

  const returnEndReason = () => {
    if (endReason.wrongAnswer) return 'Vastasit väärin ja peli päättyi'
    else if (endReason.finish) return 'Mahtavaa! Vastasit kaikkiin kysymyksiin oikein'
    else if (endReason.userQuit) return 'Pelasit varman päälle ja lopetit kesken :)'
    else return 'ZZzzZz.. nukahdit ja aika loppui kesken'
  }

  return (
    <Container>
      <Row>
        <Col>
          <Typography variant="h4">
            Game Over
          </Typography>
        </Col>
      </Row>
      <Row xs={1} md={2}>
        <Col>
          <Row>
            <Col>
              <Typography>
                {returnEndReason()}
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography>
                Pääsit kysymykseen {round}/10
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography>
                Sait {score} pistettä
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="contained" color="primary" onClick={handleStart}>
                {t('game.start')}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography>
                tai
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="contained" color="primary" onClick={handleStart}>
                Valitse toinen peli
              </Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <Typography>TOP 10</Typography>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {tableColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">
                    1
                  </TableCell>
                  <TableCell>
                    hakkis
                  </TableCell>
                  <TableCell align="right">
                    3450
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
      </Row>
    </Container>
  )
}

export default Recap;