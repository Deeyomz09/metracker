import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading }
}) => {
  if (isAuthenticated)
    return (
      <>
        {" "}
        <Navbar /> <Component />
      </>
    );

  return <Navigate to="/" />;
};
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
