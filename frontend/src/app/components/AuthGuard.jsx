"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../../lib/hooks/redux";
import { setUser } from "../../lib/features/auth/authSlice";

export default function AuthGuard({ children, requireAuth = false }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const token = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData && !user) {
      try {
        const parsedUser = JSON.parse(userData);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_data");
      }
    }

    if (requireAuth && !token) {
      router.push("/login");
    }
  }, [dispatch, router, user, requireAuth]);

  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return children;
}
