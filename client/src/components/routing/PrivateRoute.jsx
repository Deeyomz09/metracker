import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../layout/Navbar";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading }
}) => {
  const [open, setOpen] = useState(true);

  if (isAuthenticated)
    return (
      <div className="flex">
        <Navbar
          open={open}
          setOpen={setOpen}
        />
        <div
          className={`${
            open ? "ml-80" : "ml-20"
          } duration-300 transition-all flex-1 min-h-screen bg-gray-100 p-7`}
        >
          <Component />
        </div>
      </div>
    );

  return <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  component: PropTypes.elementType.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
