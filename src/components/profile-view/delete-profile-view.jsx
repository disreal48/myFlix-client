import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export const DeleteProfileView = ({ user, onLoggedOut, token }) => {
  const handleClick = (event) => {
    event.preventDefault();

    const userUrl = `https://moviedb48-03600596b84d.herokuapp.com/users/${user.Username}`;

    fetch(userUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        alert("User successfully deleted");
        window.location.reload();
        onLoggedOut();
      } else {
        alert("Delete failed");
      }
    });
  };
  return (
    <div className="d-grid gap-2">
      <h2>Do you really want to delete your profile? All data will be lost!</h2>
      <Button variant="danger" size="lg" onClick={handleClick}>
        Delete Profile
      </Button>
    </div>
  );
};

DeleteProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.array,
  }).isRequired,
  onLoggedOut: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
