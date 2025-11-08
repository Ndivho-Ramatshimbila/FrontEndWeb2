import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  // ✅ Read token and role from localStorage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toUpperCase();

  console.log("ProtectedRoute debug:", { token, role, allowedRoles });

  // 1️⃣ Not logged in
  if (!token) {
    console.log("Redirecting to login: no token");
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Logged in but role is missing or not allowed
  if (!role) {
    console.log("Redirecting to login: role missing");
    return <Navigate to="/login" replace />;
  }

  const allowedRolesUpper = allowedRoles.map((r) => r.toUpperCase());

  if (!allowedRolesUpper.includes(role)) {
    console.log("Redirecting to unauthorized: role not allowed");
    return <Navigate to="/unauthorized" replace />;
  }

  // 3️⃣ Authorized — render child component
  return children;
}
