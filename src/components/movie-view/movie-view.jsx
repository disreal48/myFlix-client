import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card variant="link">
      <Card.Img variant="top" src={movie.image} md={8} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.genre}</Card.Text>
        <Card.Text>{movie.director}</Card.Text>
        <Card.Text>{movie.description}</Card.Text>
      </Card.Body>
      <Button onClick={onBackClick}>Back</Button>
    </Card>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    director: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
