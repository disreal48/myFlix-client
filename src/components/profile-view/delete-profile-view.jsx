import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export const DeleteProfileView = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
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
        setUser(null);
        setToken(null);
        localStorage.clear();
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
