import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          exercises
        </Link>
        <div className=" navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Exercises
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Create Exercise Log
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                Create User
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  axios
                    .get("http://localhost:5000/exercises/mail/")
                    .then((response) => console.log(response.data))
                    .catch((err) => console.log(err.message));
                }}
              >
                Send
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
