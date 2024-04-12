import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ViewProfileView } from "../profile-view/view-profile-view";
import { EditProfileView } from "../profile-view/edit-profile-view";
import { DeleteProfileView } from "../profile-view/delete-profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react"; // Add the missing import statement
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setFavoriteMovies } from "../../redux/reducers/favoriteMovies";

export const MainView = () => {
  const movies = useSelector((state) => state.movies);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const favoriteMovies = useSelector((state) => state.favoriteMovies);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://moviedb48-03600596b84d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            director: movie.Director.Name,
            genre: movie.Genre.Name,
            description: movie.Description,
            image: movie.ImagePath,
          };
        });

        dispatch(setMovies(moviesFromApi));
      });
  }, [token, dispatch]);

  useEffect(() => {
    if (!user) {
      return;
    }
    fetch(
      `https://moviedb48-03600596b84d.herokuapp.com/users/${user.Username}/movies`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            director: movie.Director.Name,
            genre: movie.Genre.Name,
            description: movie.Description,
            image: movie.ImagePath,
          };
        });

        dispatch(setFavoriteMovies(moviesFromApi));
      });
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={6}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : favoriteMovies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {favoriteMovies &&
                      favoriteMovies.map((movie) => (
                        <Col className="mb-4" key={movie.id + 1} md={12}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/viewprofile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ViewProfileView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/editprofile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <EditProfileView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/deleteprofile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <DeleteProfileView />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
