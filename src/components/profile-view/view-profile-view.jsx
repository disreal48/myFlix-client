import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export const ViewProfileView = () => {
  const user = useSelector((state) => state.user);
  const birthday = new Date(user.Birthday).toDateString();

  return (
    <Card bg="dark" text="white">
      <Card.Header as="h5">User Profile</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Username:</strong> {user.Username}
          <br></br>
          <strong>Email:</strong> {user.Email}
          <br></br>
          <strong>Birthday:</strong> {birthday}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
