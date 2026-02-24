import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/config/redux/reducer/authReducer";
import styles from "./styles.module.css";

export default function NavBarComponent() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        <h1
          style={{ cursor: "pointer", padding: "1.2rem" }}
          onClick={() => router.push("/")}
        >
          PinPoint📍
        </h1>

        <div className={styles.navBarOptionContainer}>
          <div className={styles.navBarOptionContainer__options}>
            {!isAuthenticated && (
              <div
                className={styles.navBarOptionContainer__option}
                onClick={() => router.push("/")}
              >
                Explore
              </div>
            )}

            {isAuthenticated && role === "admin" && (
              <>
                <div onClick={() => router.push("/admin-users")}>Users</div>
                <div onClick={() => router.push("/dashboard")}>
                  Admin Dashboard
                </div>
              </>
            )}

            {isAuthenticated && role === "user" && (
              <div onClick={() => router.push("/user-dashboard")}>
                My Properties
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <div onClick={handleLogout} className={styles.buttonJoin}>
              Logout
            </div>
          ) : (
            <div
              onClick={() => router.push("/login")}
              className={styles.buttonJoin}
            >
              Login
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
