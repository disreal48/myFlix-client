import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movies/${encodeURIComponent(movie.id)}`}
      style={{ textDecoration: "none" }}
    >
      <Card className="h-100" bg="dark" text="white">
        <Card.Img className="h-100" variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.genre}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
  }).isRequired,
};
