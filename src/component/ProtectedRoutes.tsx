import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hook/useTypedSelector"

const ProtectedRoutes = () => {
  const loggedIn = useAppSelector((state) => state.auth.isAuthenticate);
  let location = useLocation();
  return (
    loggedIn ? <Outlet /> :
      <Navigate
        to={{ pathname: "/login" }}
        state={{ from: location }}
        replace
      />
  )
}

export default ProtectedRoutes;