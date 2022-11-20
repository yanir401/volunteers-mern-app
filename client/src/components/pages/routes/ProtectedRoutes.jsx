import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, Link } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, []);

  return <Outlet />;
};

export default ProtectedRoutes;
