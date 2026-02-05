import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  children?: React.ReactElement;
}

const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/sign-in",
  children,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
