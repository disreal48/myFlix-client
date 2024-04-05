import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, user, token, favoriteMovies }) => {
  const { movieId } = useParams();

  const movie = movies.find((b) => b.id === movieId);

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
        alert("Movie added to favorites successfully");
        window.location.reload();
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
        alert("Movie removed from favorites successfully");
        window.location.reload();
      } else {
        alert("Movie could not be removed to favorites");
      }
    });
  };

  return (
    <div>
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

      {isAlreadyFavorite ? (
        <Button variant="warning" onClick={() => removeFromFavorites()}>
          Remove from Favorites
        </Button>
      ) : (
        <Button variant="success" onClick={() => addToFavorites()}>
          Add to Favorites
        </Button>
      )}

      <div className="d-flex justify-content-end">
        <Link to={`/`}>
          <Button className="back-button">Back</Button>
        </Link>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
};
