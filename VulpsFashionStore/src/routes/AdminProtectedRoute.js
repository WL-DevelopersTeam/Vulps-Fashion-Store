import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // ❌ Logged in but not admin
  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // ✅ Admin can access
  return children;
}
