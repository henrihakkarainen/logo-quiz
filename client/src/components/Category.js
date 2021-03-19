import { useTranslation } from 'react-i18next';
import Card from 'react-bootstrap/Card';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import placeholder from '../images/background/category_default.png';

const Category = (props) => {
  const [ t, i18n ] = useTranslation();

  return (
    <Card border="dark">
      <Card.Img
        src={props.bgUrl ? props.bgUrl : placeholder}
      />
      <Card.Body>
        <Card.Title>{props.title[i18n.language]}</Card.Title>
        <Card.Text>{props.description[i18n.language]}</Card.Text>
      </Card.Body>
      <ListGroup>
        <ListGroupItem>
          <LinkContainer to={`/play?category=${props.alias}`}>
            <Card.Link>{t('play')}</Card.Link>
          </LinkContainer>
          <LinkContainer to={`/highscores?category=${props.alias}`}>
            <Card.Link>{t('highscores')}</Card.Link>
          </LinkContainer>
        </ListGroupItem>
      </ListGroup>
    </Card>
    
  )
}

export default Category;