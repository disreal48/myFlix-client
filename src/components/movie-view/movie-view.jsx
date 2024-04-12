import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavoriteMovie } from "../../redux/reducers/favoriteMovies";
import { removeFavoriteMovie } from "../../redux/reducers/favoriteMovies";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useState } from "react";

export const MovieView = () => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const favoriteMovies = useSelector((state) => state.favoriteMovies);
  const navigate = useNavigate();

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  const dispatch = useDispatch();

  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  const isAlreadyFavorite = favoriteMovies.find(
    (movie) => movie.id === movieId
  );

  const addToFavorites = () => {
    if (isAlreadyFavorite) {
      alert("Movie is already in favorites.");
      return;
    }

    const userUrl = `https://moviedb48-03600596b84d.herokuapp.com/users/${user.Username}/movies/${movieId}`;
    http: fetch(userUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        dispatch(addFavoriteMovie(movie));
      } else {
        alert("Movie could not be added to favorites");
      }
    });
  };

  const removeFromFavorites = () => {
    const userUrl = `https://moviedb48-03600596b84d.herokuapp.com/users/${user.Username}/movies/${movieId}`;
    http: fetch(userUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        dispatch(removeFavoriteMovie(movie));
      } else {
        alert("Movie could not be removed from favorites");
      }
    });
  };

  return (
    <div>
      <Row>
        <div>
          <img className="w-100" src={movie.image} />
        </div>
        <div>
          <span>
            <b>Title: </b>
          </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>
            <b>Director: </b>
          </span>
          <span>{movie.director}</span>
        </div>
        <div>
          <span>{movie.description}</span>
        </div>
      </Row>
      <Row>
        {isAlreadyFavorite ? (
          <Button
            variant="warning"
            onClick={() => {
              removeFromFavorites();
              toggleShowA();
            }}
          >
            Remove from Favorites
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={() => {
              addToFavorites();
              toggleShowA();
            }}
          >
            Add to Favorites
          </Button>
        )}
      </Row>
      <ToastContainer className="bg-dark" position="bottom-end">
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Favorite Movies</strong>
          </Toast.Header>
          {isAlreadyFavorite ? (
            <Toast.Body>Movie successfully added to favorites.</Toast.Body>
          ) : (
            <Toast.Body>Movie successfully removed from favorites.</Toast.Body>
          )}
        </Toast>
      </ToastContainer>
      <Row>
        <Button className="back-button" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Row>
    </div>
  );
};
