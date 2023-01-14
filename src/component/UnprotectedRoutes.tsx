import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hook/useTypedSelector"

const UnprotectedRoutes = () => {
  const loggedIn = useAppSelector((state) => state.auth.isAuthenticate);
  let location = useLocation();
  return (
    loggedIn ?
      <Navigate
        to={{ pathname: "/" }}
        state={{ from: location }}
        replace
      /> : <Outlet />)
}

export default UnprotectedRoutes;