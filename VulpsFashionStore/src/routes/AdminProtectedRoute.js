import { Navigate } from "react-router-dom";

const ADMIN_EMAILS = [
  "sandesh@gmail.com",
  "pranay@gmail.com"
];

export default function AdminProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // ❌ Logged in but not admin
  if (!ADMIN_EMAILS.includes(user.email)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Logged in admin
  return children;
}
